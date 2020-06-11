

import React from 'react';
// const cors = require('cors')


export class Search extends React.Component {

    state = { 
        loading:false,
        speech:""
    };


    componentDidMount() {
        }

 
    render() {
        if(this.state.loading){
            return(
             <div className="preloader-wrapper active">
             <div className="spinner-layer spinner-yellow-only">
             <div className="circle-clipper left">
                 <div className="circle"></div>
             </div><div className="gap-patch">
                 <div className="circle"></div>
             </div><div className="circle-clipper right">
                 <div className="circle"></div>
             </div>
             </div>
         </div>
         )
        }

        return(
            <>
           
                    <form onSubmit={this.props.search}>
                        <div className="col s8 left-align">
                            <div className="row">
                                <div className="col s10 m8 l5">
                                <img alt="" width="100"className="circle" src="heimer.jpg"></img>
                                </div>
                                <div className="valign-wrapper col s2">
                                    {/* <div className="speech-bubble">{this.state.speech}</div> */}
                                </div>
                            </div>
                            <br></br>
                            <input placeholder="search for cards" className="searchInput" onChange={this.props.defineSearch}></input>
                            <button type="submit"  className="btn " onClick={this.props.search}>search</button>
                        </div>
                    </form>
                 

            </>
        )}
}













