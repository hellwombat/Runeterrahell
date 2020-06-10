

import React from 'react';
// const cors = require('cors')


export class Search extends React.Component {

    state = { 
        loading:false
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
                            <img alt="" width="100"className="circle" src="heimer.jpg"></img>
                            <br></br>
                            <input placeholder="search for cards" className="searchInput" onChange={this.props.defineSearch}></input>
                            <button type="submit"  className="btn " onClick={this.props.search}>search</button>
                        </div>
                    </form>
                 

            </>
        )}
}













