import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Chat.css';
import { Button, Form, Grid, Header, Image, Segment, Icon, Divider, List, Menu, Input } from 'semantic-ui-react';
import { sendMessage } from '../redux/actions';
import * as socketClient from '../socket-api.js';

const mapStateToProps = (state, ownProps) => {
  state = state.roomReducer;
  return {
    chat: state.chat,
    user: state.username,
    room: state.room
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    sendMessage: (user, message) => dispatch(sendMessage({message: message, sender: user}))
  }
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSend() {
    socketClient.sendMessage(this.props.room, this.props.user, this.state.text);
    this.props.sendMessage(this.props.user, this.state.text);
    this.setState({
      text: ''
    })
  }

  handleKeyDown(e) {
    if(e.keyCode === 13){
      this.handleSend();
    }
  }

  render() {
    const chat = this.props.chat.slice(0).reverse();
    return (
      <div class="chat-container">
        <div class="messages">
          {chat.map((m, i) => {
            return <ChatMessage message={m.message} sender={m.sender} me={m.me} />
          })}
        </div>
        <div class="input-box">
          <Input
            icon={<Icon name='send' inverted circular link color='violet' onClick={this.handleSend}/>}
            placeholder='Say something...'
            style={{ width: '100%', color: 'rgb(243, 243, 252)' }}
            name = 'text'
            value={this.state.text}
            onChange={this.handleChange}
            onKeyDown={e => this.handleKeyDown(e)}
          />

        </div>
      </div>
    )
  }
}

function ChatMessage(props) {
  if (props.me) {
    return (
      <div class='my-message-container'>
        <div class='my-message'>
          {props.message}
        </div>
      </div>
    );
  }
  else {
    return (
      <div class='other-message-container'>
          <div class='other-message'>
            <div class='other-message-text'>
              {props.message}
            </div>
            <div class='sender'>
              {props.sender}
            </div>
          </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
