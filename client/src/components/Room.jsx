import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Divider, List } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Room.css';
import Games from './Games';


const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
})

const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

class Room extends React.Component {
  render() {
    return (
      <div class='parent'>
        <br />
        <Message color='violet' style={{textAlign: 'center', fontWeight: 'bold', fontSize: 'medium', width: '20%'}} compact content="Room Name"/>
        <br />
        <br />
        <div class='child'>
          <div class='player-box'>
            <Divider horizontal>
              <Header as='h4'>
                <Icon name='group' />
                  Players
              </Header>
            </Divider>
            <div class='player-list'>
              <List>
                <List.Item>Apples</List.Item>
                <List.Item>Pears</List.Item>
                <List.Item>Oranges</List.Item>
              </List>
            </div>
          </div>
          <div class='game-box'>
            <Divider horizontal>
              <Header as='h4'>
                GAMES
              </Header>
            </Divider>
            <Games/>
          </div>
          <div class='message-box'>
            <Divider horizontal>
              <Header as='h4'>
                <Icon name='chat' />
                  Messages
              </Header>
            </Divider>
            <Segment placeholder></Segment>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
