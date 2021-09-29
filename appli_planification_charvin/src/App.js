import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './Components/Footer/Footer.js';
import Error from './Containers/Error/Error.js'
import Login from './Containers/Login/Login.js';
import Booking from './Containers/Booking/Booking.js';
import Admin from './Containers/Admin/Admin.js';
import Stats from './Containers/Stats/Stats.js';



function App() {
  return (
    <>
      <Router>

        <Switch>
          <Route exact path = '/login' component = { Login } />
          <Route exact path = '/' component = { Booking } />
          <Route exact path = '/admin' component = { Admin } />
          <Route exact path = '/stats' component = { Stats } />
          <Route path = '/' component = { Error }/>        
        </Switch>

        <Footer/>

      </Router>

    </>
  );
}

export default App;


