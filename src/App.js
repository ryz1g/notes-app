import styled from "styled-components";
import Notes from "./commponents/Notes";

const FullPage = styled.div`
  padding : 10px;
  /* width : 100%; */
  height : 100%;
  background-color : rgba(0,0,0,0.1);
`;

function App() {
  return (
    <FullPage>
      <Notes />
    </FullPage>
  );
}

export default App;
