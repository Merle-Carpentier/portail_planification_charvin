import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.js'
import { Provider } from 'react-redux'
import store from './redux/store'

//injection de l'application (avec le Provider redux pour hydrater l'appli avec le store) dans la page html
ReactDOM.render(
  <Provider store = {store}> 
    <App />,
  </Provider>,
  document.getElementById('root')
)

