import styled from "styled-components";
import Notes from "./commponents/Notes";

// class UpdateText {
//   text = "";
//   value = 0;

//   constructor() {
//     makeAutoObservable(this);
//   }
//   update(input) {
//     this.text = input;
//     this.value = input.length;
//   }
// }

// const myText = new UpdateText();

// const DisplayText = styled.h1`
//   color : blue;
//   align-content : center;
// `;

// const ProgressBar = styled.progress`
//   accent-color : red;
// `;

// const MyTextView = observer(({comp}) => {
//   return (
//     <div>
//       <h1>{"Current Text : " + comp.text}</h1>
//       <ProgressBar max="40" value={comp.value}/>
//     </div>
//   );
// });

// function updator(val) {
//   myText.update(val);
// }

// const MainArea = styled.div`
//   padding : 4rem;
// `;

// const InputBox = styled.input`
//   width : calc(100%);
//   font-size : 3rem;
//   padding : 20px;
// `;

// function App() {
//   return (
//     <MainArea>
//       <InputBox id="textBox" type="text" onInput={() => updator(document.getElementById("textBox").value)} />
//       <MyTextView comp={myText}/>
//     </MainArea>
//   );
// }

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
