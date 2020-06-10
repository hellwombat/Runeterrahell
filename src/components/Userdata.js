import React from 'react';

export class Userdata extends React.Component {
    constructor(props){
        super(props);
        this.deck = props.currentDeck
        this.state = { 
            user:[],
            deckName:props.currentDeck
        };
    }


    componentDidMount() {
        fetch('http://localhost:5000/fetchData', {
            headers:{
                "Authentication":localStorage.jwt,
                // "Access-Control-Allow-Origin":"*"
            }

        })
        // .then(  this.setState({username:data}))
        //   .then(res => console.log(res.json()))
        //   .then(console.log(res.json()))
        .then(res => res.json())
        .then(user => this.setState({user:user}, () => console.log('data fetched', user)))
    }




    render() {
        return(
            <>
            <div>
                

                {this.state.user.map(user => (
                    <p key={user.username}>Load a deck {user.username}!</p>
                ))}


                <div className="row">
                    {this.props.deck.map(deck => (
                        <div key={deck.deckName} className="col s3">
                            <button id={deck.deckName} value={deck.decklist} onClick={(e) => {this.props.loadDeck(e.target.value);this.props.selectCurrentDeck(e.target.id)}} className="btn" key={deck.username}>{deck.deckName}</button>
                        </div>
                    ))}
                </div>
    

            </div>
            </>
        )}
}