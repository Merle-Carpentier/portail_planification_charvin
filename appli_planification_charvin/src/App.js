import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './Components/Footer/Footer.js';
import Error from './Containers/Error/Error.js'
import Login from './Containers/Login/Login.js';
import Booking from './Containers/Booking/Booking.js';
import Admin from './Containers/Admin/Admin.js';
import Stats from './Containers/Stats/Stats.js';
import Logout from './Containers/Logout/Logout.js';
import WharehouseAdd from './Containers/WharehouseAdd/WharehouseAdd.js';
import WharehouseEdit from './Containers/WharehouseEdit/WharehouseEdit.js';
import WharehouseModif from './Containers/WharehouseModif/WharehouseModif.js'
import UserBddAdd from './Containers/UserBddAdd/UserBddAdd.js';
import CustomerAdd from './Containers/CustomerAdd/CustomerAdd.js';
import CustomerModif from './Containers/CustomerModif/CustomerModif.js'


function App() {
  return (
    <div className="app">
      <Router>

        <Switch>
          <Route exact path = '/login' component = { Login } />
          <Route exact path = '/' component = { Booking } />
          <Route exact path = '/admin' component = { Admin } />
          <Route exact path = '/admin/wharehouse/add' component = { WharehouseAdd } />
          <Route exact path = '/admin/wharehouse/edit/:id' component = { WharehouseEdit } />
          <Route exact path = '/admin/wharehouse/modif/:id' component = { WharehouseModif } />
          <Route exact path = '/admin/userBdd/add' component = { UserBddAdd } />
          <Route exact path = '/admin/customer/add' component = { CustomerAdd } />
          <Route exact path = '/admin/customer/modif/:id' component = { CustomerModif } />
          <Route exact path = '/stats' component = { Stats } />
          <Route exact path = '/logout' component = { Logout } />
          <Route path = '/' component = { Error }/>        
        </Switch>

        <Footer />

      </Router>

    </div>
  )
}

export default App;


