import React from 'react'
// import loginImg from 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYlJOjgSHf9aQX6LQ1mLtoEc45AEAPwhvHZrROLrbbcltsEH_N&usqp=CAU'

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.props = props.isLoggedin
    
        this.state = {
          username: '',
          password: '',
        };
    }

    loginUser = async (event) => {

        event.preventDefault();

        const username = this.state.username
        const password = this.state.password

        let connection = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({"username":username,"password":password})
        })

       //should use state to send error messages to user
        let response = await connection.text();
        this.props.setjwt(response)
    };

    //set the state to the user input
    onChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });


        }


    render(){
        const { username, password } = this.state;
        return(
        <div className="container">

  
            <div className="image">
                <img alt="" src="lor2.png" className="responsive-img animate__animated animate__fadeIn"></img>
            <h4 className="animate__animated animate__bounceIn"> Login</h4>

                <form className="form" onSubmit={this.loginUser}>
                    <div className="form-group">
                        <label htmlFor="Username"></label>
                        <input type="text" name="username" placeholder="username" onChange={this.onChange} value={username}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Password"></label>
                        <input type="text" name="password" placeholder="Password" onChange={this.onChange} value={password}></input>
                    </div>

                    <div className="footer">
                        <button className="btn" >Login</button>
                    </div>

                </form>
            </div>
        </div>
        )
    }
}