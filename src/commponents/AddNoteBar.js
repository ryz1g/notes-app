import styled from "styled-components";
import Button from "./Button";

const AddNoteBar = styled.div`
    display : flex;
    flex-direction : row;
    gap : 7px;
    justify-content: center;
    align-items: center;
    input[type="text"] {
        padding : 5px;
        height : 25px;
    }
    button {
        padding : 5px; 
        height : 39px;
    }
`;

function App({ handleClick }) {
    return (
        <AddNoteBar>
            <input id="subjectBox" type="text" />
            <input id="textBox" type="text" />
            <Button onClick={() => handleClick()} label={"Add Note!"} />
        </AddNoteBar>
    );
}

export default App;