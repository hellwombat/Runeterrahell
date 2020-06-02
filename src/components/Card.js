import React, {Component} from 'react';
export default class Card extends Component{
    state = {
        cards: []
    }

    async componentDidMount() {

        const fetchData = async () => {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = 'https://dd.b.pvp.net/latest/set1/en_us/data/set1-en_us.json';
            return fetch(proxyurl + url)

          }
        const printData = async () => {
            try {
              const response = await fetchData()
              const data = await response.json()
            //   const cards = await json
              this.setState({cards:data,loading: false})

              console.log(this.state)
            } catch(e) {
                console.error("Problem", e)
            }
        }



        printData();
        
    }
    
  
 
    render() {
       if(this.state.loading){
           return <div>loading</div>
       }
      if(!this.state.cards.length){
          return <div>found no cards</div>
      }
        

        return(
            <>

            <div className="container">
                <h1>cards</h1>
                {this.state.cards.map(card => (
                    <div key={card.cardcode}>
                        <div className="row">
                            <div className="col s12 m6">
                            <div className="card">
                                <div className="card-image">
                                <img alt="" src={card.assets[0].fullAbsolutePath}></img>
                                <span className="card-title">{card.name}</span>
                                <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                                </div>
                                <div className="card-content">
                        <p>{card.descriptionRaw}<br></br>
                        {card.type === 'Unit' ? card.attack+"/"+card.health : card.spellSpeed}        
                        </p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
            </>
        );
    }

}

