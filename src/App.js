import React, {Component} from 'react';
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
import './App.css';
import { Login } from "./components/login/Login"
// import Card from './components/Card';
// import { Register } from "./components/login/Register"


Amplify.configure(awsconfig);
class App extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }




  componentDidMount() {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }

  render() {

    return (
      <div className="App">
        <div className="login">
          <div className="containerReact">

            <nav><p>his</p></nav>
            <ul>
            {this.state.customers.map(customer => 
              <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
            )}
            </ul>
            <Login /> 
            {/* <Register /> */}
            {/* <Card /> */}
          </div>
        </div>
      </div>
    );
  }
}



export default App;
