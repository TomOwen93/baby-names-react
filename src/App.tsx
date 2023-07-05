import "./style.css";
import MainContent from "./components/MainContent";

function App(): JSX.Element {
  return (
    <section>
      <h1 className="title">Baby Name Selector</h1>
      <MainContent />
    </section>
  );
}

export default App;
