import React from 'react';

export class Deck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deck:[],
            deckName :this.props.currentDeck,
            deckToBeDeleted:'',
            message:''
        } 
    }


    //Incase we need to do something on mount
    componentDidMount(){}


    //the onchange function used by
    //the deck name input field
    onChange = (e) => {
        //set the state to the name of the targetted button
        this.setState({ [e.target.name]: e.target.value });
    }


    //this function generates a code from the cards ina deck
    //then it saves that deck code to the database
    genrateDeckCode(props){
        const deck = props.deck
        var deckCode = ""
        deck.forEach((element) => {
            deckCode = deckCode.concat(".").concat(element.cardCode)
        })


            fetch('http://localhost:5000/saveDeck', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            "Authentication":localStorage.jwt,
        },
            body: JSON.stringify({"deckCode":deckCode, "deckName":this.state.deckName})
        })
        .then(res => res.json)
        .then(this.setState({message:"deck saved"}))
        .then(this.props.selectCurrentDeck(this.state.deckName))
    }


    //delete a deck by its name and user
    deleteDeck(deckName){
        //go to the delete api with the user and the deckname
        fetch('http://localhost:5000/deleteDeck', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            "Authentication":localStorage.jwt,
            },
            body: JSON.stringify({ "deckToBeDeleted":deckName})
        })
    }
    
    //the render method
    render() {


        //define deckname from the state
        const { deckName } = this.state;


        //get the current deck from the props
        const { currentDeck } = this.props;


        return(
        <>


            <p><i>{this.state.message}</i></p>
            <p>{this.props.deck.length}/30</p>

            
            <input name="deckName" placeholder="deckname" onChange={this.onChange} value={deckName}></input>


            <ul className="collection">
                
                {this.props.deck.map((card, i) => (

                    <li key={i} className="collection-item avatar amber lighten-4 animate__animated animate__fadeInRightBig">
                        <img src={card.assets[0].fullAbsolutePath} alt="" className="circle responsive-img"></img>
                        <span className="title">Title</span>
                        <p> {card.name} </p>
                        <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                    </li>

                ))}

            </ul>


            <button className="btn" onClick={() => {this.genrateDeckCode(this.props)}}>save deck</button>
            <button className="btn" onClick={(e) => {this.deleteDeck(currentDeck)}}>delete deck</button>


        </>
    )}
}












