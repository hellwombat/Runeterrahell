import React, {Component} from 'react';
import './App.css';
import { Login } from "./components/login/Login"
import Dashboard from './components/Dashboard';
import { Register } from "./components/login/Register"


class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedin:localStorage.jwt,
      regLog : true,
      username:"",
      password:""
    };
  }



  componentDidMount() {}



  //set the web token
  //lifted from login component
  setjwt = async (response) => {

    localStorage.jwt = response
    this.setState( {isLoggedin:localStorage.jwt})


  }


//logs the user out
 logout = () => {

    window.localStorage.removeItem('jwt');
    this.setState( {isLoggedin:localStorage.jwt})


  }



  //switches between register and login
 RegLogChange = () => {

    if(this.state.regLog === true){

      this.setState( {regLog:false})

    }else{

      this.setState( {regLog:true})

    }


  }



  render() {
  const isLoggedIn = this.state.isLoggedIn;
  const regLog = this.state.regLog;


    // if(isLoggedIn === localStorage.jwt){
 
    //   var renderRegLog = regLog ? <Login setjwt={this.setjwt} isLoggedin={this.state.isLoggedIn}/> : <Register />
    //   var renderRegLogText = regLog ? "Register" : "Login"
      

    // return (
    //   <div className="App">
    //     <div className="login">
    //       <div className="containerReact">
    //         <nav className="right-align"><button onClick={this.RegLogChange} className="btn" >{renderRegLogText}</button></nav>
    //           {renderRegLog}
    //       </div>
    //     </div>
    //   </div>
    // );

    // }else{


      return (
        <div className="App">
          <div className="login">
            <div className="containerReact">
              <nav className="right-align">  <button className="btn " onClick={this.logout}>logout</button></nav>
              <br></br>
           
                <Dashboard />
              
            </div>
          </div>
        </div>
      );
    // }






    // return (
    //   <div className="App">
    //     <div className="login">
    //       <div className="containerReact">
    //         <nav></nav>
    //           <Card />
    //           {renderLogin}
    //           {renderRegister}
    //           {conRenderUserData}
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}



export default App;
