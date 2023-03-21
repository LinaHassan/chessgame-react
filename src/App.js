import "./App.css";
import Game from "./views/Game";
import { store } from "./App/store";
import { Provider } from "react-redux";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Game />
      </Provider>
    </div>
  );
}

export default App;
