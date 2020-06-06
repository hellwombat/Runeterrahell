import React from 'react'
// import loginImg from 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYlJOjgSHf9aQX6LQ1mLtoEc45AEAPwhvHZrROLrbbcltsEH_N&usqp=CAU'

export class Login extends React.Component {

    constructor(props){
        super(props);
    }
    postUser = async (event) => {
        event.preventDefault();

            await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"

        },
            body: JSON.stringify({"username":"mkee","password":"mke"})
        })
    };

    render(){
        return(
        <div className="container">
            <div className="content"></div>
            <div className="image">
            <img alt="" src="lor2.jpg" className="responsive-img"></img>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="Username"></label>
                        <input type="text" name="username" placeholder="username"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email"></label>
                        <input type="text" name="email" placeholder="email"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password"></label>
                        <input type="text" name="Password" placeholder="Password"></input>
                    </div>
                    <div className="footer">
                        <button type="button" className="btn" onClick={this.postUser}> 
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}