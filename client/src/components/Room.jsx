import { Button, Rating, Form, Grid, Header, Image, Segment, Icon, Divider, List, Menu, Message } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Room.css';
import Games from './Games';
import { AiOutlineLaptop } from "react-icons/ai";
import Chat from './Chat';


const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
})

const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

class Room extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class='parent'>
        <br />
        {/* <Message color='violet' style={{textAlign: 'center', fontWeight: 'bold', fontSize: 'medium', width: '20%'}} compact content="Room Name"/> */}
        <br />
        <div class='top'>
          <div class="room-title">
            <Segment inverted color='violet'>
              <Header as='h4' inverted>
                Room Name
              </Header>
            </Segment>
          </div>
          <AiOutlineLaptop color='green' size={80} className="icon-spin" />
          <div class="links">
            <Menu widths={2} secondary>
              <Menu.Item>
                <Button color='green'>Invite</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color="red">Leave</Button>
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
