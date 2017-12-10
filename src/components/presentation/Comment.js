import React, {Component} from 'react';


class Comment extends Component {
  render(){
    return(
      <div>
        {this.props.currentComment.username} <br/>
        {this.props.currentComment.body} <br/>
        {this.props.currentComment.timestamp}
      </div>
    )
  }
}

export default Comment;
