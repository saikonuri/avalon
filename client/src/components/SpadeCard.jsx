import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Spades.css';
import Spades from './Spades';
import * as socketClient from '../socket-api.js';

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

const mapping = {
  '2S': {color: 'black', value: 2, suit: 'spades'},
  '3S': {color: 'black', value: 3, suit: 'spades'},
  '4S': {color: 'black', value: 4, suit: 'spades'},
  '5S': {color: 'black', value: 5, suit: 'spades'},
  '6S': {color: 'black', value: 6, suit: 'spades'},
  '7S': {color: 'black', value: 7, suit: 'spades'},
  '8S': {color: 'black', value: 8, suit: 'spades'},
  '9S': {color: 'black', value: 9, suit: 'spades'},
  '10S': {color: 'black', value: 10, suit: 'spades'},
  'JS': {color: 'black', value: 'J', suit: 'spades'},
  'QS': {color: 'black', value: 'Q', suit: 'spades'},
  'KS': {color: 'black', value: 'K', suit: 'spades'},
  'AS': {color: 'black', value: 'A', suit: 'spades'},
  '2C': {color: 'black', value: 2, suit: 'clubs'},
  '3C': {color: 'black', value: 3, suit: 'clubs'},
  '4C': {color: 'black', value: 4, suit: 'clubs'},
  '5C': {color: 'black', value: 5, suit: 'clubs'},
  '6C': {color: 'black', value: 6, suit: 'clubs'},
  '7C': {color: 'black', value: 7, suit: 'clubs'},
  '8C': {color: 'black', value: 8, suit: 'clubs'},
  '9C': {color: 'black', value: 9, suit: 'clubs'},
  '10C': {color: 'black', value: 10, suit: 'clubs'},
  'JC': {color: 'black', value: 'J', suit: 'clubs'},
  'QC': {color: 'black', value: 'Q', suit: 'clubs'},
  'KC': {color: 'black', value: 'K', suit: 'clubs'},
  'AC': {color: 'black', value: 'A', suit: 'clubs'},
  '2D': {color: 'red', value: 2, suit: 'diamonds'},
  '3D': {color: 'red', value: 3, suit: 'diamonds'},
  '4D': {color: 'red', value: 4, suit: 'diamonds'},
  '5D': {color: 'red', value: 5, suit: 'diamonds'},
  '6D': {color: 'red', value: 6, suit: 'diamonds'},
  '7D': {color: 'red', value: 7, suit: 'diamonds'},
  '8D': {color: 'red', value: 8, suit: 'diamonds'},
  '9D': {color: 'red', value: 9, suit: 'diamonds'},
  '10D': {color: 'red', value: 10, suit: 'diamonds'},
  'JD': {color: 'red', value: 'J', suit: 'diamonds'},
  'QD': {color: 'red', value: 'Q', suit: 'diamonds'},
  'KD': {color: 'red', value: 'K', suit: 'diamonds'},
  'AD': {color: 'red', value: 'A', suit: 'diamonds'},
  '2H': {color: 'red', value: 2, suit: 'hearts'},
  '3H': {color: 'red', value: 3, suit: 'hearts'},
  '4H': {color: 'red', value: 4, suit: 'hearts'},
  '5H': {color: 'red', value: 5, suit: 'hearts'},
  '6H': {color: 'red', value: 6, suit: 'hearts'},
  '7H': {color: 'red', value: 7, suit: 'hearts'},
  '8H': {color: 'red', value: 8, suit: 'hearts'},
  '9H': {color: 'red', value: 9, suit: 'hearts'},
  '10H': {color: 'red', value: 10, suit: 'hearts'},
  'JH': {color: 'red', value: 'J', suit: 'hearts'},
  'QH': {color: 'red', value: 'Q', suit: 'hearts'},
  'KH': {color: 'red', value: 'K', suit: 'hearts'},
  'AH': {color: 'red', value: 'A', suit: 'hearts'},
  'JOKER': {color: 'green', value: '$', suit: 'joker'}
};

class SpadeCard extends React.Component {
  constructor(props){
    super(props);

    this.handleDiscard = this.handleDiscard.bind(this);
  }

  handleDiscard(key){
    console.log('Discarding ' + this.props.game.players[this.props.user].hand[key]);
    const hand = this.props.game.players[this.props.user].hand;
    const card = mapping[this.props.game.players[this.props.user].hand[key]];

    // if startingsuit == null, then don't do any checks...
    if(this.props.game.startingSuit == null){
      socketClient.sendSpades(this.props.room, this.props.user, "DISCARD", {index: key});
      return;
    }

    var anything = true;
    for(var i = 0; i < hand.length; i++){
      var suit = mapping[hand[i]].suit;
      if(suit == "joker"){
        continue;
      }
      if(suit === this.props.game.startingSuit){
        anything = false;
      }
    }

    if(!anything && card.suit !== this.props.game.startingSuit){
      if(card.suit == "joker" && this.props.game.startingSuit == "spades"){
        socketClient.sendSpades(this.props.room, this.props.user, "DISCARD", {index: key});
        return;
      }
      alert('Must discard same suit!');
      return;
    }
    socketClient.sendSpades(this.props.room, this.props.user, "DISCARD", {index: key});
  }

  render() {
    console.log(this.props.card);
    let properties = mapping[this.props.card];
    let symbolDiv = null;
    let symbolSpan = null;

    let myTurn = (this.props.user === this.props.game.order[this.props.game.turn]);

    if(properties !== null && properties !== undefined){
      switch(properties.suit){
        case 'spades':
          symbolDiv = <div class="small-symbol" style={{color: "black"}}>&spades;</div>;
          symbolSpan = <span style={{color: "black"}}>&spades;</span>;
          break;
        case 'clubs':
          symbolDiv = <div class="small-symbol" style={{color: "black"}}>&clubs;</div>;
          symbolSpan = <span style={{color: "black"}}>&clubs;</span>;
          break;
        case 'hearts':
          symbolDiv = <div class="small-symbol" style={{color: "red"}}>&hearts;</div>;
          symbolSpan = <span style={{color: "red"}}>&hearts;</span>;
          break;
        case 'joker':
          symbolDiv = <div class="small-symbol" style={{color: "purple"}}>&#120129;</div>;
          symbolSpan = <span style={{color: "purple"}}>&#120129;</span>;
          break;
        default:
          symbolDiv = <div class="small-symbol" style={{color: "red"}}>&diams;</div>;
          symbolSpan = <span style={{color: "red"}}>&diams;</span>;
          break;
      };
    }

    if(this.props.discard){
      return(
        <div class="spades-discard-container">
          <div class="spades-card-top" style={properties.color == "red" ? {color: 'red'}: {color: 'black'} }>{properties.value}
              {symbolDiv}
            </div>
            {symbolSpan}
        <div class="spades-card-bottom">{symbolDiv}</div>
        </div>
      )
    }

    return (
      <a class={this.props.mine ? "spade-my-card" : "spade-flipped-card"} onClick={this.props.game.stage == 'TRICK' && myTurn ? () => this.handleDiscard(this.props.index): console.log("Can't discard!")}>
        {this.props.mine ? (
          <div class="spades-card-container">
            <div class="spades-card-top" style={properties.color == "red" ? {color: 'red'}: {color: 'black'} }>{properties.value}
              {symbolDiv}
            </div>
            {symbolSpan}
        <div class="spades-card-bottom">{symbolDiv}</div>
          </div>
        ) : <div/>}
      </a>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpadeCard);
