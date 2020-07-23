import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Divider, List, Card } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Skull.css';
import * as socketClient from '../socket-api.js';
import {FaSkull} from 'react-icons/fa';
import {GiSunflower, GiConsoleController} from 'react-icons/gi';

const mapStateToProps = (state, ownProps) => {
  state = state.roomReducer;
  return {
    user: state.username,
    room: state.room,
    game: state.game,
    users: state.users
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
  }
};

const colors = ['black', 'brown', 'navy', 'red', 'purple', 'blue'];

const getUserCards = (cards, user, other) => {
  return cards[user].map((c,i) => {
    return(
      <div class={other ? "skull-other-card" : "skull-card" } onClick={() => console.log('clicked card')}>
        {other ? <div/> : c === 'flower' ? <GiSunflower size="30px" style={{marginTop: '50%'}}/>: <FaSkull size="30px" style={{marginTop: '50%'}}/>}
      </div>
    )
  })
};

const getPotCards = (pot, user) => {

  return(
    <div class="other-pot-container">
      <div class="other-pot">
        {
          pot[user].map((c,i) => {
            return (
              <div class={c.revealed ? "skull-pot-card skull-pot-card-revealed" : "skull-pot-card" }>
                {!c.revealed ? <div/> : c.value === 'flower' ? <GiSunflower size="20px" style={{marginTop: '50%'}}/>: <FaSkull size="20px" style={{marginTop: '50%'}}/>}
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

class Skull extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    var dummy = {
      points: {'saikonuri': 0, 'Mark': 0, 'Aman': 0},
      cards: {
        'saikonuri': ['flower', 'skull', 'flower', 'flower'],
        'Mark': ['flower', 'skull', 'flower', 'flower'],
        'Aman': ['flower', 'skull'],
        'Sahithi': ['flower', 'skull', 'flower', 'flower'],
        'Aruna': ['flower', 'skull', 'flower', 'flower']
      },
      pot: {
        'saikonuri': [{
          revealed: true,
          value: 'flower'
        }],
        'Mark': [{
          revealed: false,
          value: 'skull'
        }],
        'Aman': [{
          revealed: false,
          value: 'skull'
        }],
        'Sahithi': [{
          revealed: false,
          value: 'skull'
        }],
        'Aruna': []
      }
    };

    var users = Object.keys(dummy.cards);
    users.splice(users.indexOf(this.props.user), 1);

    return (
      <div class="skull-container">
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingLeft: '2%', paddingRight: '2%'}}>
          <Button compact color= 'blue' style={{width: '15%' ,fontSize: 'small', marginLeft: 0}}>New Game</Button>
          <Button compact color= 'red' style={{width: '15%' ,fontSize: 'small', marginLeft: 0}}>End Game</Button>
        </div>
        {<text style={{marginLeft: '10px', fontSize: 'large'}}>{this.props.user}: {0}</text>}
        <div class="my-skull-cards">
          {getUserCards(dummy.cards, this.props.user, false)}
        </div>
        <div class="skull-table">
          <div style={{height: '10%', paddingTop: '0.25%',width: '100%', display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
            <Button compact color= 'violet' style={{width: '15%' ,fontSize: 'small'}}>Won Round</Button>
            <Button compact color= 'orange' style={{width: '15%' ,fontSize: 'small'}}>New Round</Button>
          </div>
          <div class="my-skull-pot">
            {getPotCards(dummy.pot, this.props.user)}
          </div>
          <div class="other-skull-pots">
            {users.map(u =>
              getPotCards(dummy.pot, u)
            )}
          </div>
        </div>
        <div class="other-skull-cards">
          {users.map(u =>
            <div class="other-set-container">
              <div class='other-set'>
                {getUserCards(dummy.cards, u, true)}
              </div>
              <br/>
              {u !== null ? <text style={{marginLeft: '10px', fontSize: 'large'}}>{u}: {0}</text>: <text></text>}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Skull);
