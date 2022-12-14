import React, { useContext, useEffect, useRef , useState} from "react";
import NoteContext from "../context/notes/noteContext";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  let history = useNavigate();
  const {showAlert}=props;
  const context = useContext(NoteContext);
  const { notes, getNotes ,editNote} = context;
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
  else{
    history("/login");
  }
    // eslint-disable-next-line
  }, []);
  
  const [note, setNote] = useState({id: "",etitle: "", edescription: "", etag: ""})

  const updateNote = (Currentnote) => {
     ref.current.click();
     setNote({id: Currentnote._id,etitle:Currentnote.title,edescription:Currentnote.description,etag:Currentnote.tag});
  };

  const handleClick = (e)=>{
      e.preventDefault();
      refClose.current.click();
      editNote(note.id,note.etitle,note.edescription,note.etag);
      props.showAlert("Updated Successfully","success")
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <AddNotes showAlert={showAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                </div>
               
                
            </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>Your Notes</h2>
      <div className="row my-3">
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} notes={note} showAlert={showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
