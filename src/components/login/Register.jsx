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

        onChange = (e) => {
            /*
              Because we named the inputs to match their
              corresponding values in state, it's
              super easy to update the state
            */
            this.setState({ [e.target.name]: e.target.value });
          }
        onChange2 = (e) => {
            /*
              Because we named the inputs to match their
              corresponding values in state, it's
              super easy to update the state
            */
            this.setState({ [e.target.name]: e.target.value });
          }




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
    };



    render(){
        const { username, password } = this.state;
        return(
        <div className="container" ref={this.props.containerRef}>
            <div className="row">
                <div className="col s6 valign-wrapper">
                </div>
                <div className="col s6"></div>
            </div>
            <div className="content"></div>
            <div className="image">
                <img alt="" src="lor2.jpg" className="responsive-img"></img>


                <form onSubmit={this.postUser}>
                    <div className="form-group">
                        <label htmlFor="Username"></label>
                        <input type="text" id="username" name="username" placeholder="username"  onChange={this.onChange} value={username}></input>
                    </div>
                    <div className="form-group"></div>
                        <label htmlFor="Password"></label>
                        <input type="text" id="password" name="password" placeholder="Password" onChange={this.onChange} value={password}></input>
                 
                    <div className="footer">
                    <button  className="btn waves-effect waves-light" >Submit
                    </button>
                    </div>
                </form>


            </div>
        </div>
        )}
}