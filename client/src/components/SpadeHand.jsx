import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Spades.css';
import * as socketClient from '../socket-api.js';
import SpadeCard from './SpadeCard.jsx';

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

class SpadeHand extends React.Component {
  render() {
    return (
      <div class="spade-hand">
        {this.props.hand.map((h) => {
          return(
            <SpadeCard mine={this.props.mine} card={h}/>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpadeHand);
