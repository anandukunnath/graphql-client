// import logo from './logo.svg';
// import './App.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import Homepage from "./containers/Homepage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Homepage/>
      </Provider>
    </div>
  );
}
 
export default App;
