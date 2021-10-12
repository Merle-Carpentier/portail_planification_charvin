import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './Components/Footer/Footer.js';
import Error from './Containers/Error/Error.js'
import Login from './Containers/Login/Login.js';
import Booking from './Containers/Booking/Booking.js';
import Admin from './Containers/Admin/Admin.js';
import Stats from './Containers/Stats/Stats.js';
import Logout from './Containers/Logout/Logout.js';



function App() {
  return (
    <div className="app">
      <Router>

        <Switch>
          <Route exact path = '/login' component = { Login } />
          <Route exact path = '/' component = { Booking } />
          <Route exact path = '/admin' component = { Admin } />
          <Route exact path = '/stats' component = { Stats } />
          <Route exact path = '/logout' component = { Logout } />
          <Route path = '/' component = { Error }/>        
        </Switch>

        <Footer />

      </Router>

    </div>
  );
}

export default App;


