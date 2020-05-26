import { Button, Rating, Form, Grid, Header, Image, Segment, Icon, Divider, List, Menu, Message } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Room.css';
import Games from './Games';
import { AiOutlineLaptop } from "react-icons/ai";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Chat from './Chat';
import {toast} from 'react-tiny-toast';
import {Redirect} from 'react-router-dom';


const mapStateToProps = (state, ownProps) => {
  state = state.roomReducer;
  return {
  // ... computed data from state and optionally ownProps
    room: state.room,
    game: state.game,
    users: state.users,
    creator: state.creator,
    username: state.username,
    chat: state.chat,
    connected: state.connected
}};

const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.handleCopy = this.handleCopy.bind(this);
  }

  handleCopy() {
    toast.show('Invite link copied to clipboard!', { timeout: 3000, position: 'bottom-right' });
  }

  render() {
    if(this.props.room === null){
      return(
        <Redirect to="/" />
      );
    }
    console.log(this.props);
    return (
      <div class='parent'>
        <div style={{marginTop: '25px'}}></div>
        <div class='top'>
          <div class="room-title">
          {/* <AiOutlineLaptop color='black' size={80} className="icon-spin" /> */}
          <h2>Zoom Rooms</h2>
          </div>
          {/* <Segment inverted color='violet'>
              <Header as='h2' inverted>
                Room Name
              </Header>
            </Segment> */}
            <h1>{this.props.room}</h1>
          <div class="links">
            <Menu widths={2} secondary>
              <Menu.Item>
              <CopyToClipboard text={window.location.hostname + ':3000/join/kul'} >
                <Button icon labelPosition='left' color='green' onClick={() => this.handleCopy()}>
                  <Icon name='linkify'/>
                  Invite
                </Button>
              </CopyToClipboard>
              </Menu.Item>
              <Menu.Item>
                <Button icon labelPosition='right' color="red">
                <Icon name='sign-out alternate'/>
                  Leave
                </Button>
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <br />
        <br />
        <div class='child'>
          <div class='player-box'>
            <Divider horizontal>
              <Header as='h4'>
                <Icon name='group' />
              </Header>
            </Divider>
            <div class='player-list'>
              <List>
                {/* <List.Item>Apples</List.Item>
                <List.Item>Pears</List.Item>
                <List.Item>Oranges</List.Item> */}
                {this.props.users.map((u, i) => {
                  return <List.Item>{u}</List.Item>
                })}
              </List>
            </div>
          </div>
          <div class='game-box'>
            <Divider horizontal>
              <Header as='h4'>
                GAMES
              </Header>
            </Divider>
            <Games />
            <br />
            <Rating style={{ width: '10%' }} icon='heart' defaultRating={3} maxRating={5} />
            <div >
              <Message style={{ width: '20%', margin: 'auto', marginTop: '1%' }}>
                Leave a rating!
              </Message>
            </div>
          </div>
          <div class='message-box'>
            <Divider horizontal>
              <Header as='h4'>
                <Icon name='chat' />
              </Header>
            </Divider>
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
