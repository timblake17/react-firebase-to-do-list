import React, { Component } from "react";
import "./Note.css";
import PropTypes from "prop-types";
import NoteForm from "../NoteForm/NoteForm";
import App from "../App";

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
    this.addNote = this.addNote.bind(this);
    // this.editNote = this.editNote.bind(this);

    this.state = { showForm: false };
  }

  handleRemoveNote(id) {
    this.props.removeNote(id);
  }

  editNote(id) {
    this.props.editNote(id);
  }
  addNote(note) {
    ///push the note into notes array
    this.database.push().set({ noteContent: note });
  }

  render(props) {
    return (
      <div className="note fade-in">

        <span
          className="closeBtn"
          onClick={() => this.handleRemoveNote(this.noteId)}
        >
          &times;
        </span>

        {this.state.showForm ? (
          <NoteForm
            addNote={noteContent => {
              this.props.editNote(noteContent);
              window.location.reload();

              this.setState({ showForm: false });
            }}
            value={Note}
          />
        ) : null}

        <p className="noteContent">{this.noteContent}</p>

          <span
            className="editBtn"
            onClick={() => this.setState({ showForm: true })}
          >
            Edit
          </span>
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
};
export default Note;
