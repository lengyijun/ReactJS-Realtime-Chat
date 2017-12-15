import React, { Component, PropTypes} from 'react';
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap';
import ChatInput from './components/screens/ChatInput';
import GroupChat from './components/screens/GroupChat';
import Navbar from './components/global/Navbar';
import socket from './socket.js'

//Redux components
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as messageActions from './actions';
import FileSaver from 'file-saver'

class App extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    console.log(this.props.globalstate)
		socket.on('init', this._initialize.bind(this));
		socket.on('send:message', this._messageRecieve.bind(this));
		socket.on('send:file', this._fileRecieve.bind(this));
		socket.on('user:join', this._userJoined.bind(this));
		socket.on('user:left', this._userLeft.bind(this));
		// socket.on('change:name', this._userChangedName.bind(this));
  }

  _userLeft(data){
    console.log("user lefted")
    console.log(data)
    this.props.actions.deleteUser(data.name)
  }

  _userJoined(data){
    console.log("user joined")
    console.log(data)
    this.props.actions.addUser(data.name)
  }

  _messageRecieve(message){ //todo,not complete
    console.log("============")
    console.log(message)
    console.log(this.props.actions.postMessage)
    this.props.actions.postMessage(JSON.stringify(message),"http://res.cloudinary.com/technoetics/image/upload/v1491538348/technoetics/profilepenguin.png")
  }

  base64toBlob (b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i=0; i<slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

  _fileRecieve(data){
    console.log("receive file")
    var d=JSON.parse(data,(k,v)=>{return v})
    var b=d.content.split(",")
    console.log(b)
    if(d.type in ['txt','md','js','c','cpp']){
      var blob = new Blob([d.content], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, d.title);
    }else{
      var blob = this.base64toBlob(b[1], b[0].split(';')[0].split(":")[1]) 
      // var blob = this.base64toBlob(b[1], 'image/jpeg') 
      FileSaver.saveAs(blob,d.title)
    }
  }

  _initialize(data){
    console.log("initial")
    console.log(data)
    console.log(typeof data)
    this.props.actions.initialUser(data.users)
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Grid>
            <Row className="show-grid">
              <Col xs={12} md={4}>
              <ChatInput messageItems={this.props.globalstate.message} actions={this.props.actions} users={this.props.globalstate.user} userIndex={1}/>
              </Col>
              <Col xs={12} md={8} >
              <GroupChat messageItems={this.props.globalstate.message} actions={this.props.actions}/>
              </Col>
            </Row>
          </Grid>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
	return {
		globalstate: state.chatOperations
	};
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(messageActions, dispatch)
})

App.propTypes = {
  globalstate: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);