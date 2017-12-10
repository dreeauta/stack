import React, {Component} from 'react';
import Zone from '../presentation/Zone';
import superagent from 'superagent';

class Zones extends Component {
  constructor(){
    super();
    this.state ={
      zone: {
        name: '',
        zipCodes: ''
      },
      list: [
      ]
    }
  }

  componentDidMount(){
    //function gets called regardless of if we call it or not on page load

    superagent
    .get('/api/zone')
    .query(null)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        alert('Error: ' + err)
      }
      console.log(JSON.stringify(response.body))
      let results = response.body.results;

      this.setState({
        list: results
      })
    })
  }



  updateZone(event){
    console.log('update Zone: ' + event.target.id + ' = ' + event.target.value)
    let updatedZone = Object.assign({}, this.state.zone);
    updatedZone[event.target.id] = event.target.value;
    this.setState({
      zone: updatedZone
    })
  }

  submitZone(){
    console.log('submit Zone: ' + JSON.stringify(this.state.zone))
    let updatedList = Object.assign([], this.state.list);
    updatedList.push(this.state.zone);
    this.setState({
      list: updatedList
    })
  }

  render(){
    const listItems = this.state.list.map((zone,i) => {
       return (<li key={i}> <Zone zone={zone}/> </li>
       )

    })

    return (
      <div>
        <ol>
           {listItems}

        </ol>

        <div>
          <input id="name" onChange={this.updateZone.bind(this)} type='text' placeholder='Zone name'/> <br/>
          <input id="zipCodes" onChange={this.updateZone.bind(this)} type="text" placeholder='Zipcode' /> <br/>
          <button onClick={this.submitZone.bind(this)}> Submit Zone </button>
        </div>
      </div>
    )
  }
}

export default Zones;
