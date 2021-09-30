import './App.css';
import Login from './component/login';
import Email from './component/Sub-Component/email';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/email'>
          <Email />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
