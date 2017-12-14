/**
 * @file GroupChat
 * Component to display messages displayed by the user
 */
import React, { Component } from 'react';
import Conversation from 'chat-template/dist/Conversation';
import './css/GroupChat.css'
export default class GroupChat extends Component {
    constructor(props) {
        super(props);
        console.log("propsItems", this.props.messageItems);
        this.state = {
            messages: this.props.messageItems
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log("nextProps", nextProps);
        this.setState({ messages: nextProps.messageItems })
    }
    render() {
        return (
            <div className="groupChatContainer">
                <span className="groupChatText">
                    <h4>
                        <b>
                            GroupChat Messages
                    </b>
                    </h4>
                </span>
                <Conversation height={300} style={{ width: 400 }} messages={this.state.messages} turnOffLoop={true} />
            </div>
        )
    }
}