import './App.css';
import Login from './component/login';
import Email from './component/Sub-Component/email';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './common/components/privateRote'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <PrivateRoute component={Email} path="/email" exact />
      </Switch>
    </Router>
  );
}

export default App;
