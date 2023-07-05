import "./style.css";
import MainContent from "./components/MainContent";

function App(): JSX.Element {
  return (
    <body>
      <h1 className="title">Welcome!</h1>
      <MainContent />
    </body>
  );
}

export default App;
