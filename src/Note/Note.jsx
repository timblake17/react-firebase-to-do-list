import React, { Component } from "react";
import "./Note.css";
import PropTypes from "prop-types";
import NoteForm from "../NoteForm/NoteForm";
import './Note.css';


class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
    // this.editNote = this.editNote.bind(this);

    this.state = { showForm: false };
  }

  handleRemoveNote(id) {
    this.props.removeNote(id);
  }

  editNote(id) {
    this.props.editNote(id);
  }

  render(props) {
    return (
      <div className="note fade-in">
        <span
          className="closebtn"
          onClick={() => this.handleRemoveNote(this.noteId)}
        >
          &times;
        </span>
        <span
          className="editbtn"
          onClick={() => this.setState({ showForm: true })}
        >
          Edit
        </span>
        {this.state.showForm ? (
          <NoteForm addNote={(noteContent) =>{
              this.props.editNote(noteContent);
              this.setState({showForm: false})

            }}
              value={Note} />
        ) : null}

        <p className="noteContent">{this.noteContent}</p>
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
};
export default Note;
