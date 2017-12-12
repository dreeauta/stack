import React, {Component} from 'react';
import Zone from '../presentation/Zone';
import {APIManager} from '../../utils';

class Zones extends Component {
  constructor(){
    super();
    this.state = {
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
    APIManager.get('/api/zone', null, (err, response) => {
      if (err) {
        alert('Error: ' + err.message) //callback was message
        return
      }

      console.log('RESULTS: ' +JSON.stringify(response.results));

      this.setState({
        list: response.results
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
    console.log('submit Zone: ' + JSON.stringify(updatedZone))
      let updatedZone = Object.assign({}, this.state.zone)
      updatedZone['zipCodes'] = updatedZone.zipCodes.split(',')


    APIManager.post('/api/zone', updatedZone, (err, response) => {
      if (err) {
        alert('Error: '+ err.message)
        return
      }
      console.log('ZONE Created: ' + JSON.stringify(response));

      let updatedList = Object.assign([], this.state.list);
      updatedList.push(response.result);  //at this point the updatedZone doesn't exist until we get it back from the API

      this.setState({
        list: updatedList
      })

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
