import React, {Component} from 'react';
import './App.css';
import { Login } from "./components/login/Login"
// import Card from './components/Card';
// import { Register } from "./components/login/Register"


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

            <nav></nav>
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
