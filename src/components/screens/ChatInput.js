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
            messageValue: '',
            clickedItem:0,
            clickedItemText:""
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
        socket.emit("send:message",this.state.messageValue+"=="+this.state.clickedItemText)
    }

    getComponent(index) {
        console.log(index)
        if(index==this.state.className){
// nothing todo
        }else{
            var a=document.getElementsByTagName("li")
            var b=a[index+1]
            console.log(b.textContent)
            var origin=a[this.state.clickedItem+1]
            origin.style.background='white'
            b.style.backgroundColor='red'
            this.state.clickedItem=index
            this.state.clickedItemText=b.textContent
        }
    }

    render() {
        return (
            <div className="userContainer">
                {/* User {this.props.userIndex} */}
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
                                <ul className="userlist">
                                        {
                                                this.props.users.map((user, i) => {
                                                        return (
                                                                <li key={i} onClick={this.getComponent.bind(this, i)}>
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