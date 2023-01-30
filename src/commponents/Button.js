import styled from "styled-components";

const Rectangle = styled.div`
    background-color : #506AA3;
    padding : 4px;
    text-align : center; 
    &:hover {
        cursor : pointer;
        background-color : #A5BCF0;
    };
`;

function App({onClick, label}) {
    return (
        <Rectangle onClick={() => onClick()}>
            {label}
        </ Rectangle>
    );
};

export default App;