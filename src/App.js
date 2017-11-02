import React, { Component } from 'react';
import './App.css';
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';


class App extends Component {
  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    // this.editNote = this.editNote.bind(this);


    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notes');
    //////////set react state
    this.state ={
      notes: [

      ],
    }
  }

componentWillMount(){
  const previousNotes = this.state.notes;
///data snapshot object
  this.database.on('child_added', snap => {
    previousNotes.push({

      id: snap.key,
      noteContent: snap.val().noteContent,
    })

    this.setState({
      notes: previousNotes
    })
  })

  this.database.on('child_removed', snap =>{
    for (var i=0; i<previousNotes.length; i++){
      if (previousNotes[i].id === snap.key){
        previousNotes.splice (i,1);
      }
    }
    this.setState({
      notes: previousNotes
    })
  })

}
addNote(note){
  ///push the note into notes array
this.database.push().set({ noteContent: note});
}

removeNote(noteId){
  this.database.child(noteId).remove();
}

editNote(noteId,noteContent){
this.database.child(noteId).update({noteContent: noteContent})}

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React toDo List</div>
        </div>
        <div className="notesBody">
        {
          this.state.notes.map((note)=> {
            return (
              <Note noteContent= {note.noteContent } noteId ={note.id} key={note.id}
                removeNote = {this.removeNote}
                editNote={(noteContent) => this.editNote(note.id, noteContent)}/>
            )

          })

        }

        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
