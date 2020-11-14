import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// import { createBrowserHistory } from "history";
import Layout from './component/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/burgerbuilder';
import Chekout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Login from './containers/Auth/Auth';

// var hist = createBrowserHistory();
class App extends Component {
  render(){
    return (
      <div >
       <Layout>
         <Router>
         <Switch>
              <Route path= "/checkout"  component = {Chekout} ></Route> 
              <Route path= "/orders" component = {Orders} ></Route>
              <Route path= "/login" component = {Login} ></Route>
              <Route path= "/"  component = {BurgerBuilder} exact></Route> 
              <Redirect to="/" />
          </Switch>

         </Router>
        
         </Layout>
          
      </div>
    );
  }
 
}

export default App;
