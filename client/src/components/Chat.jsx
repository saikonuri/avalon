import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Chat.css';
import { Button, Form, Grid, Header, Image, Segment, Icon, Divider, List, Menu, Input } from 'semantic-ui-react';

const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
})

const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [
        {
          sender: 'Mark',
          message: 'Lets play some smash! Lets play some smash! Lets play some smash!',
          me: false
        },
        {
          sender: 'Sai',
          message: 'I dont want to. Lets play some smash! Lets play some smash! Lets play some smash!',
          me: true
        },
        {
          sender: 'Aman',
          message: 'So down',
          me: false
        }
      ]
    }
  }

  render() {
    const chat = this.state.chat.slice(0).reverse();
    return (
      <div class="chat-container">
        <div class="messages">
          {chat.map((m, i) => {
            return <ChatMessage message={m.message} sender={m.sender} me={m.me} />
          })}
        </div>
        <div class="input-box">
          <Input
            icon={<Icon name='send' inverted circular link color='violet' />}
            placeholder='Say something...'
            style={{ width: '100%', color: 'rgb(243, 243, 252)' }}
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
