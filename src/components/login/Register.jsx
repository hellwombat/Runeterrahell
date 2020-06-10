import React from 'react'
// const cors = require('cors')





export class Register extends React.Component {

    constructor() {
        super();
        this.state = {
          username: '',
          password: '',
        };
    }

        //set the state to the user input
        onChange = (e) => {

            this.setState({ [e.target.name]: e.target.value });


          }




    // hit the register end point with the usersname and password 
    // to register a new user
      postUser = async (event) => {

        event.preventDefault();
        const { username, password } = this.state;

        console.log(username)
        console.log(password)
            await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({"username":username,"password":password})
        })
         //should use state to send error messages to user

         
    };



    render(){

        const { username, password } = this.state;
        //what is containerRef??

        return(


            <div className="container" ref={this.props.containerRef}>

                <img alt="" src="lor3.png" className="responsive-img animate__animated animate__fadeIn responsive-img"></img>
                <h4 className="animate__animated animate__bounceIn">Register</h4>


                <form onSubmit={this.postUser}>
                    <div className="form-group">
                        <label htmlFor="Username"></label>
                        <input type="text" id="username" name="username" placeholder="username"  onChange={this.onChange} value={username}></input>
                    </div>


                    <div className="form-group">
                        <label htmlFor="Password"></label>
                        <input type="text" id="password" name="password" placeholder="Password" onChange={this.onChange} value={password}></input>
                    </div>


                    <div className="footer">
                        <button  className="btn waves-effect waves-light" >Register</button>
                    </div>
                </form>

            </div>
        )
    }
}