import React, { Component } from "react";
import './NoteForm.css';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: ""
    };
    ////bind handleUserInput to this component to keep this from being undefined
    ///during listener event
    this.handleUserInput = this.handleUserInput.bind(this);

    //bind writenote to our state
    this.writeNote = this.writeNote.bind(this);
  }
  ////when user input changes, set newNoteContent
  ///to value of what is in input box
  handleUserInput(e) {
    this.setState({
      newNoteContent: e.target.value ////value of user input
    });
  }

  writeNote() {
    //call a method that sets the noteContent for a note to
    // the value of the input

    this.props.addNote(this.state.newNoteContent);

    ///set newNoteContent back to empty string to empty input
    ///box after wirtenote() takes place which happens onClick
    ///of our button
    this.setState({
      newNoteContent: ""
    });
  }

  render() {
    return (
      <div className="formWrapper">
        <input
          className="noteInput"
          placeholder="Write a New Note"
          value={this.state.newNoteContent}
          onChange={this.handleUserInput}
        />

        <button className="noteButton" onClick={this.writeNote}>
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteForm;
