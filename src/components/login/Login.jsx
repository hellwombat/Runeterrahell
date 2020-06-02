import React from 'react'
// import loginImg from 'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'

export class Login extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className="container" ref={this.props.containerRef}>
            <div className="row">
                <div className="col s6 valign-wrapper">
                    {/* <div className="header"><h3>Login</h3></div> */}
                </div>
                <div className="col s6"></div>
            </div>
            <div className="content"></div>
            <div className="image">
                <img alt="" src="lor2.jpg" className="responsive-img"></img>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="Username"></label>
                        <input type="text" name="username" placeholder="username"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password"></label>
                        <input type="text" name="Password" placeholder="Password"></input>
                    </div>
        <div className="footer">
            <button type="button" className="btn">
                Login
            </button>
        </div>
                </div>
            </div>
        </div>
        )}
}