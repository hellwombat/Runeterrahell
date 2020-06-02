import React from 'react'
// import loginImg from 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYlJOjgSHf9aQX6LQ1mLtoEc45AEAPwhvHZrROLrbbcltsEH_N&usqp=CAU'

export class Register extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className="container">
            <div className="header">Register</div>
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
                        <button type="button" className="btn">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}