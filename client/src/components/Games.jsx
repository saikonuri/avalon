import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Divider, List, Card } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Games.css';
import * as socketClient from '../socket-api.js';

import Skull from './Skull';
import Spades from './Spades';

const mapStateToProps = (state, ownProps) => {
  state = state.roomReducer;
  return {
    user: state.username,
    room: state.room,
    game: state.game,
    users: state.users,
    creator: state.creator
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
  }
}

class Games extends React.Component {
  constructor(props){
    super(props);

    this.handleStart = this.handleStart.bind(this);
  }

  handleStart(game){
    var range = {
      'avalon': [5,10],
      'skull': [1,6],
      'fishbowl': [4,50],
      'coup': [3,6],
      'codewords': [4,8],
      'spyfall': [3, 20],
      'spades': [2,8]
    };

    if(this.props.users.length > range[game][1]){
      alert('Too many players for this game!');
      return;
    }

    if (this.props.users.length < range[game][0]){
      alert('Too few players for this game!');
      return;
    }

    socketClient.startGame(this.props.room, this.props.user, game);
  }

  render() {
    if(this.props.game !== null){
      if(this.props.game.name == 'SKULL'){
        return (
          <Skull />
        )
      }
      if(this.props.game.name == 'SPADES'){
        return <Spades />
      }
    }
    return (
      <div className="container">
        <Card.Group id="game-cards" centered>
          <Card>
            <Card.Content>
              <Image
                src='https://i.pinimg.com/474x/0f/41/92/0f419203b2f4c004afaab0740b4fd4c4.jpg'
                size='small'
              />
              <Card.Header>Spades</Card.Header>
              <Card.Meta>2-8</Card.Meta>
              <Card.Description>
                Card Game
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic color='purple' onClick={() => this.handleStart('spades')} disabled={this.props.creator !== this.props.user}>
                Start
              </Button>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Image
                src='https://i.pinimg.com/474x/0f/41/92/0f419203b2f4c004afaab0740b4fd4c4.jpg'
                size='small'
              />
              <Card.Header>Skull</Card.Header>
              <Card.Meta>3-6</Card.Meta>
              <Card.Description>
                Card game that involves bluffing and betting.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button basic color='purple' disabled>
                  Start
                </Button>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Image
                src='https://i.pinimg.com/474x/0f/41/92/0f419203b2f4c004afaab0740b4fd4c4.jpg'
                size='small'
              />
              <Card.Header>Fishbowl</Card.Header>
              <Card.Meta>4+</Card.Meta>
              <Card.Description>
                Taboo, Charades, Password
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic color='purple' disabled>
                Start
              </Button>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Image
                src='https://i.pinimg.com/474x/0f/41/92/0f419203b2f4c004afaab0740b4fd4c4.jpg'
                size='small'
              />
              <Card.Header>Coup</Card.Header>
              <Card.Meta>3-6</Card.Meta>
              <Card.Description>
                Bluffing game.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic color='purple' disabled>
                Start
              </Button>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Image
                src='https://i.pinimg.com/474x/0f/41/92/0f419203b2f4c004afaab0740b4fd4c4.jpg'
                size='small'
              />
              <Card.Header>Codewords</Card.Header>
              <Card.Meta>4-8</Card.Meta>
              <Card.Description>
                Word game that involves giving clues.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic color='purple' disabled>
                Start
              </Button>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Image
                src='https://i.pinimg.com/474x/0f/41/92/0f419203b2f4c004afaab0740b4fd4c4.jpg'
                size='small'
              />
              <Card.Header>Spyfall</Card.Header>
              <Card.Meta>3+</Card.Meta>
              <Card.Description>
                Social deduction game.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic color='purple' disabled>
                Start
              </Button>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
