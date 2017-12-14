/**
 * @file ChatInput
 * Component to get messages from users
 */ 
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './css/ChatInput.css';
import socket from '../../socket.js'
export default class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageValue: ''
        }
    }
    /**
     * Set chat message value
     * @param {*} event 
     */ 
    handleChatMessage(event) {
        this.setState({ messageValue: event.target.value });
    }
    /**
     * Function to send user messages to store
     * @param {*} event 
     */ 
    handlePostClick(event){
        this.props.actions.postMessage(this.state.messageValue,"http://res.cloudinary.com/technoetics/image/upload/v1491538348/technoetics/profilepenguin.png")
        socket.emit("send:message",this.state.messageValue)
    }
    componentWillReceiveProps(nextProps){
        // console.log("nextpoprs in vahtinupt",nextProps);
    }
    render() {
        return (
            <div className="userContainer">
                User {this.props.userIndex}
                <br />
                <input
                    type="text"
                    className="messageValueInput"
                    id="messageValueInput"
                    name="messageValue"
                    key="messageValueInput"
                    value={this.state.messageValue}
                    onChange={(event) => this.handleChatMessage(event)} />
                <br />
                <Button bsStyle="primary" onClick={(event) => this.handlePostClick(event)}>Post</Button>
                <div className='users'>
                                <h3> Online Users </h3>
                                <ul>
                                        {
                                                this.props.users.map((user, i) => {
                                                        return (
                                                                <li key={i}>
                                                                        {user}
                                                                </li>
                                                        );
                                                })
                                        }
                                </ul>                           
                        </div>

            </div>
        )
    }
}