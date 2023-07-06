import "./style.css";
import BabyList from "./components/BabyList";
import { AppHeader } from "./components/AppHeader";

function App(): JSX.Element {
  return (
    <section>
      <AppHeader />
      <BabyList />
    </section>
  );
}

export default App;
