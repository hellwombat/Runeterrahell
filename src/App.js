import React, {Component} from 'react';
import './App.css';
import { Login } from "./components/login/Login"
import Card from './components/Card';
// import { Register } from "./components/login/Register"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }




  componentDidMount() {
    fetch('localhost/:8080')
      .then(res => res.json())
      .then(customers => this.setState({customers}));
  
  }

  render() {

    return (
      <div className="App">
        <div className="login">
          <div className="containerReact">

            <nav></nav>
            {this.state.customers.map(customer => 
          <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
            )}
            <Login /> 
            {/* <Register /> */}
            <Card />
          </div>
        </div>
      </div>
    );
  }
}



export default App;
