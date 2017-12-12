import React, {Component} from 'react';
import Comment from '../presentation/Comment';
import superagent from 'superagent';
import {APIManager} from '../../utils';

class Comments extends Component {
  constructor(){
    super();
    this.state = {
      comment: {
        username: '',
        body: '',
        timestamp: ''
      },
      list: [
      ]
    }
  }

  componentDidMount(){
      APIManager.get('/api/comment', null, (err,response) => {
        if (err) {
          alert('Error: ' + err.message)
          return
        }

        console.log('RESULTS: ' +JSON.stringify(response.results));

        this.setState({
          list: response.results
        });

    })
  }

  submitComment(){
    let updatedList = Object.assign([], this.state.list);
    updatedList.push(this.state.comment);
    this.setState({
      list: updatedList
    })
    console.log("submit" + JSON.stringify(this.state.comment));
  }

  updateComment(event) {
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment[event.target.id] = event.target.value;
    this.setState({
      comment: updatedComment
    })
  }

  render() {

    const commentList = this.state.list.map((comment, i)=> {
      return(
        <li key={i}> <Comment currentComment={comment}/></li>
      )

    })

    return(
      <div>
        <h2> Comments:  </h2>
        <ul>
          {commentList}

        </ul>

         <input id="username" onChange={this.updateComment.bind(this)} type="text" placeholder="Username"/> <br/>
         <input id="body" onChange={this.updateComment.bind(this)} type="text" placeholder="Comment" /> <br/>
         <input id="timestamp" onChange={this.updateComment.bind(this)} type="text" placeholder="Time" /> <br/>

         <button onClick={this.submitComment.bind(this)}> Submit Comment</button>
      </div>
    )
  }
}


export default Comments;
