import React, {Component} from 'react';
import { Userdata } from "./Userdata"
import { Search } from "./Search"
import { Deck } from "./Deck"
import './../App.css';

export default class Dashboard extends Component{
    
    constructor(props){
        super(props);
        this.pickCard = this.pickCard.bind(this);
    }
      
    state = {
        cards: [],
        selectedCards: [],
        searchTerm :[],
        userDecks :[],
        animation:"animate__animated animate__bounc",
        loading:false,
        currentDeck:""
    }





    //when the component mounts we need to get the users decks
    //we might have to do this differently tho
    componentDidMount(){
        this.getUsersDecks()
    }



    //this makes sure to keep track of what deck is currently in the deck editor
    selectCurrentDeck = (deckName) => {
        
       this.setState({currentDeck:deckName}) 
       console.log(deckName)

    }



    //this takes the users searchterm input and updates it in the state
    //this is lifted from the deck component
    defineSearch = async (e) => {

        this.setState({ searchTerm: e.target.value });

    }



    //This is the function that send a card
    //from the search to the deck editor
    //you pick a card and add it to the deck
    pickCard = async (cardCode) => {

        //pick selected cards from the state and add them
        //to a variable of the same name
        var {selectedCards} = this.state
        this.state.cards.cardcode = cardCode
          
        for(let i = 0; this.state.cards.length  > i; i++){
            
            if( this.state.cards[i].cardCode ===  cardCode ){

                selectedCards.push(this.state.cards[i])
                this.setState({selectedCards:selectedCards})

            }
        }
    }



    //this loads a deck into the deck component
    //it fetches the saved deck code and genretaes the cards.
    loadDeck = async (decktoBeLoaded) => {

        //here we set up to fetch all cards
        const fetchDasa = async () => {
            this.setState({loading:true})
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = 'https://dd.b.pvp.net/latest/set1/en_us/data/set1-en_us.json';
            return fetch(proxyurl + url)
            }

        // this uses the string from the deck code and seprates it into cards
        //then each card is printed in the deck editor
        const printDeck = async () => {      
            try {
                const response = await fetchDasa()
                let data = await response.json()
                const cardsInDeck = decktoBeLoaded.split('.')
                await console.log(data)  
                let cardReturned = []
                    
                    //this machine takes each card in the deck list and searches the api
                    //the each match is returned
                    for(let i = 0; cardsInDeck.length > i; i++){
                        for(let i2 = 0; data.length > i2; i2++){
                            if( data[i2].cardCode === cardsInDeck[i]){
                                cardReturned.push(data[i2])
                            }
                        }
                    }

                //here the cards are send to the deck editor
                this.setState({loading:false})
                this.setState({selectedCards:cardReturned})
                this.setState({animation:"animate__animated animate__flipInX"})

            } catch(e) {
                console.error("Problem", e)
            }
        }
        //runs it all
        printDeck();

    }



    //this searches the api for cards based on the input in the search terms
    search = async (event) => {

        //it uses a form so we have to prevent the page reload
        event.preventDefault();


        //i like animations we use animate.css to make a better UX
        this.setState({animation:"animate__animated animate__flipOutX"})


        //fetch all cards in teh game from Legends of runeterra
        const fetchData = async () => {
            this.setState({loading:true})
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = 'https://dd.b.pvp.net/latest/set1/en_us/data/set1-en_us.json';
            return fetch(proxyurl + url)
          }
      
        
        //print the cards to the search box
        //this is based on the search term.
        const printData = async () => {      
            try {
                const response = await fetchData()
                let data = await response.json()
                let searchTerm = this.state.searchTerm
                var regexConst = new RegExp(searchTerm,'i')
            
            //an array for the cards returned later
            //cards are pushed in here
            let cardReturned = []

            
                //this machine finds the selected card and pushes it
                for(let i = 0; data.length > i; i++){
                    if( data[i].name.match(regexConst) ){
                        cardReturned.push(data[i])
                    }
                }

                // PRINT cardReturned IN BROWSER
                this.setState({loading:false})
                this.setState({cards:cardReturned})
                this.setState({animation:"animate__animated animate__flipInX"})

            } catch(e) {
                console.error("Problem", e)
            }
        }
        printData();
    }



    //this searches the database for all deck by the useres ID
    //this is lifted from the user data component
    getUsersDecks = async (event) => {
        fetch('http://localhost:5000/loadDeck', {
            headers:{
                "Authentication":localStorage.jwt,
            }
        }
        )
        //WIP
        // .then(  this.setState({username:data}))
        //   .then(res => console.log(res.json()))
        //   .then(console.log(res.json()))
        .then(res => res.json())
        .then(userDecks => this.setState({userDecks:userDecks}, () => console.log('data fetched', userDecks)))
    }
  

    
    //the render
    render() {
        
        //we define the animation from the state
        const animation = this.state.animation
        return(
            <>
            <div className="container">


                <br></br>


                <div className="row">
                    <div className="col s6">
                         <Search defineSearch={this.defineSearch} search={this.search}/>
                    </div>
                    <div className="col s6">
                        <Userdata currentDeck={this.state.currentDeck} selectCurrentDeck={this.selectCurrentDeck} loadDeck={this.loadDeck} deck={this.state.userDecks} /> 
                    </div>
                </div>


                <div className="row">


                    <div className="col s8" >
                        <div className="row" id="cardbox">


                            <div>
                                <h4 className="left-align">cards</h4>
                            </div>


                            {this.state.cards.map((card) => (


                                <div key={card.cardCode}>
                                    <div className="col s12 m6 l3" >
                                        <div className={`card ${animation}`}>


                                            <div className="card-image">
                                                <img alt=""  src={card.assets[0].fullAbsolutePath}></img>
                                                <span className="card-title">{card.name}</span>
                                                <button value={card.cardCode} onClick={(e) => this.pickCard(e.target.value)} className="btn-floating halfway-fab waves-effect waves-light red"></button>
                                            </div>


                                            <div className="card-content">
                                                <p>{card.descriptionRaw}  </p><br></br>
                                                <div className="bot right-align">                                      
                                                <b> {card.type === 'Unit' ? card.attack+"/"+card.health : card.spellSpeed}</b> 
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>


                            ))}


                        </div>
                    </div>

                    <div className="col s4">
                        <h4>Your deck</h4>
                        <Deck selectCurrentDeck={this.selectCurrentDeck} deck={this.state.selectedCards} currentDeck={this.state.currentDeck}/>
                    </div>

                </div>
            </div>
            </>
        );
    }
}



