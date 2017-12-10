import React, {Component} from 'react';

class Zone extends Component {
  render(){
    return(
      <div>
        <div>
            <h2> {this.props.zone.name}  </h2>
            <span> {this.props.zone.zipCodes} </span> <br/>
            <span> {this.props.zone.comments} comments </span>
        </div>

      </div>
    )
  }
}

export default Zone;
