import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import AddNoteBar from "./AddNoteBar";
import Button from "./Button";

const Note = styled.div`
    gap : 5px;
    background-color : #F0DAA6;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.25);
    color : #333333;
    border-radius: 5px;
    grid-column: span ${({span}) => span};
    font-family: monospace;
    letter-spacing: 0.1rem;
    position : relative;
    * {
        margin : 0px;
        border : 0px;
    }
    &:hover {
        background-color :#FFEFC9;
    }
    .noteButtons {
        display : grid;
        grid-template-columns: repeat(5,1fr);
        position : absolute;
        bottom : 0px;
        width: 100%;
    }
    .input {
        font: inherit; 
        background-color: #F0DAA6;
        width : 100%;
        padding : 0px;
    }
    .note {
        padding: 3px;
    }
    .subject {
        display: flex;
        justify-content: center;
        font-weight: bold;
        font-size: 1.25rem;
        letter-spacing: 0.15rem;
    }
    .text {
        height: 153px;
        resize: none;
        background-color: #F0DAA6;
    }
`;

const PinnedNote = styled(Note)`
    background-color: #B7F0E1;
    &:hover {
        background-color :#DBFFF5;
    }
`;

const NotePad = styled.div`
    display : grid;
    padding-bottom : 10px;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 200px;
    gap : 5px;
`;

class Notes {
    notes = [{id: 1, editing: false, span: 1, pinned: false, subject: "Note 1", text: "Lorem Ipsum 1!" },
                {id: 2, editing: false, span: 3, pinned: false, subject: "Note 2", text: "Lorem Ipsum 2!" },
                {id: 3, editing: false, span: 2, pinned: false, subject: "Note 3", text: "Lorem Ipsum 3!" },
                {id: 4, editing: false, span: 1, pinned: false, subject: "Note 4", text: "Lorem Ipsum 4!" },
                {id: 5, editing: false, span: 1, pinned: false, subject: "Note 5", text: "Lorem Ipsum 5!" },
                {id: 6, editing: false, span: 2, pinned: false, subject: "Note 6", text: "Lorem Ipsum 6!" },];
    totalPinned = 0;
    constructor() {
        makeObservable(this, {
            notes: observable,
            totalPinned: observable,
            addNote: action,
            toggleEdit: action,
            togglePin: action,
            deleteNote: action,
            changeSpan: action
        });
    }

    addNote({ sub, txt }) {
        document.getElementById("subjectBox").value = "";
        document.getElementById("textBox").value = "";
        this.notes.push({
            id: this.notes.length > 0 ? this.notes.at(-1).id + 1 : 1,
            subject: sub,
            text: txt
        })
    }

    toggleEdit(editingId, editing) {
        var idx = this.notes.findIndex(({ id }) => id === editingId);
        if (editing) {
            this.notes[idx].subject = document.getElementById("editingSubject" + editingId).value;
            this.notes[idx].text = document.getElementById("editingText" + editingId).value;
        }
        this.notes[idx].editing = !editing;
    }

    togglePin(pinningId, pinned) {
        var idx = this.notes.findIndex(({ id }) => id === pinningId);
        this.totalPinned = this.totalPinned + (pinned ? -1 : 1);
        this.notes[idx].pinned = !pinned;
    }

    deleteNote(deletingId) {
        var idx = this.notes.findIndex(({ id }) => id === deletingId);
        if(this.notes[idx].pinned) this.totalPinned--;
        this.notes = this.notes.filter(({ id }) => id !== deletingId);
    }

    changeSpan(spanningId, operator) {
        var idx = this.notes.findIndex(({ id }) => id === spanningId);
        if(operator === '+') this.notes[idx].span = this.notes[idx].span === 4 ? 4 : this.notes[idx].span + 1;
        if(operator === '-') this.notes[idx].span = this.notes[idx].span === 1 ? 1 : this.notes[idx].span - 1;
    }
}


const myNotes = new Notes();


const MyNotesView = observer(({ comp }) => {
    return (
        <div>
            {myNotes.totalPinned !== 0 ? 
                <div>
                    <NotePad>
                        {comp.notes.map(({ id, editing, subject, text, pinned, span }) => {
                            return (pinned ?
                                <PinnedNote pinned={pinned} span={span}> {editing ?
                                    <div>
                                        <input id={"editingSubject" + id} className="input subject" type="text" defaultValue={subject} />
                                        <textarea id={"editingText" + id} className="input text" defaultValue={text} />
                                    </div>
                                    :
                                    <div>
                                        <div className="note subject">{subject}</div>
                                        <div className="note text">{text}</div>
                                    </div>}
                                    <div className="noteButtons">
                                        <Button onClick={() => myNotes.toggleEdit(id, editing)} label={editing ? "Save" : "Edit"} />
                                        <Button onClick={() => myNotes.deleteNote(id)} label={"Delete"} />
                                        <Button onClick={() => myNotes.togglePin(id, pinned)} label={"Unpin"} />
                                        <Button onClick={() => myNotes.changeSpan(id, '+')} label={"Inc"} />
                                        <Button onClick={() => myNotes.changeSpan(id, '-')} label={"Dec"} />
                                    </div>
                                </PinnedNote>
                                : null
                            );
                        })}
                    </NotePad>
                    <hr />
                </div>
            : null}
            <NotePad >
                {comp.notes.map(({ id, editing, subject, text, pinned, span }) => {
                            return (pinned ?
                                null :
                                <Note pinned={pinned} span={span}> {editing ?
                                    <div>
                                        <input id={"editingSubject" + id} className="input subject" type="text" defaultValue={subject} />
                                        <textarea id={"editingText" + id} className="input text" defaultValue={text} />
                                    </div>
                                    :
                                    <div>
                                        <div className="note subject">{subject}</div>
                                        <div className="note text">{text}</div>
                                    </div>}
                                    <div className="noteButtons">
                                        <Button onClick={() => myNotes.toggleEdit(id, editing)} label={editing ? "Save" : "Edit"} />
                                        <Button onClick={() => myNotes.deleteNote(id)} label={"Delete"} />
                                        <Button onClick={() => myNotes.togglePin(id, pinned)} label={"Pin"} />
                                        <Button onClick={() => myNotes.changeSpan(id, '+')} label={"Inc"} />
                                        <Button onClick={() => myNotes.changeSpan(id, '-')} label={"Dec"} />
                                    </div>
                                </Note>
                            );
                        })}
            </NotePad>
        </div>
    );
});


function addNote() {
    myNotes.addNote({ sub: document.getElementById("subjectBox").value, txt: document.getElementById("textBox").value });
}


function App() {
    return (
        <div>
            <MyNotesView comp={myNotes} />
            <AddNoteBar handleClick={addNote} />
        </div>
    );
}

export default App;