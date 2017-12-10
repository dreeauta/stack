import React, {Component} from 'react';
import Zones from '../containers/Zones';
import Comments from '../containers/Comments';

class Home extends Component {
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="left-column">
            <Zones />
          </div>
          <div className="right-column">
            <Comments />
          </div>
        </div>

      </div>

    )
  }
}

export default Home;
