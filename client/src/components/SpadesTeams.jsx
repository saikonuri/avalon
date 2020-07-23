import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Divider, List, Modal, Dropdown } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Spades.css';
import Select from 'react-select'
import * as socketClient from '../socket-api.js';

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
};

const options = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'black', label: 'Black' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'green', label: 'Green' },
  { value: 'grey', label: 'Grey' }
];

const customStyles = {
  container: provided => ({
    ...provided,
    width: 150
  })
};

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

class SpadesTeams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      teams: this.props.game.teams,
      playersTeams: this.props.game.players,
      players: this.props.game.order,
      error: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose(){
    this.setState({
      opened: false
    })
  }

  handleOpen(){
    this.setState({
      opened: true
    })
  }

  handleSave(){
    //check and set redux state
    let colors = Object.keys(this.state.teams);
    let teams = this.state.teams;

    for(var i = 0; i < colors.length; i++){
      teams[colors[i]].users = [];
      teams[colors[i]].points = 0;
      teams[colors[i]].bags = 0;
      teams[colors[i]].prediction = -1;
      teams[colors[i]].current = 0;
    }

    // how many team sizes can we go up to?
    // x/2 (ex: 2/2 = 1, 3/2 = 1, 4/2 = 2, 5/2 = 1, 6/2 = 3, 7/2 = 1, 8/2 = 4)
    for(var i = 0; i < this.state.players.length; i++){
      let p = this.state.players[i];
      let t = this.state.playersTeams[p].team;
      teams[t].users.push(p);
    }

    var limit = this.state.players.length/2;
    if(this.state.players.length%2 == 1){
      limit = 1;
    }

    var max = 0;
    var error = 0;

    for(var i = 0; i < colors.length; i++){
      let teamSize = teams[colors[i]].users.length;
      if(teamSize > max){
        max = teamSize;
      }
      if(teamSize > limit){
        error = -1;
        break;
      }
    }

    for(var i = 0; i < colors.length; i++){
      let teamSize = teams[colors[i]].users.length;
      if(teamSize != 0 && teamSize < max){
        error = -1;
        break;
      }
    }


    if(error == -1){
      this.setState({
        opened: true,
        error: true
      });
    } else {
      // call socketClient api to inform about team change
      socketClient.sendSpades(this.props.room, this.props.user, 'SET TEAMS', {teams: teams, players: this.state.playersTeams});

      this.setState({
        opened: false,
        error: false
      });
    }
  }

  handleChange(e, p){
    let value = e.value;
    let player = p;
    let playersTeams = this.state.playersTeams;

    playersTeams[player].team = value;

    this.setState({
      ...this.state,
      playersTeams: playersTeams
    });
  }

  render() {
    let access = (this.props.creator === this.props.user) && (this.props.game.round === 0);
    return (
      <Modal
        trigger={<Button onClick={() => this.handleOpen()} compact color="teal" disabled={!access}>Manage Teams</Button>}
        open={this.state.opened}
        onClose={() => this.handleClose()}
      >
        <Header content='Manage Teams' />
        {this.state.players.map((p) => {
          return(
            <div class="spades-player-team-container">
              <h4>{p}</h4>
              <Select
              styles={customStyles}
              options={options}
              onChange={(e)=>this.handleChange(e, p)}
              defaultValue={{value: this.state.playersTeams[p].team, label: capitalize(this.state.playersTeams[p].team)}}
              />

            </div>
          );
        })}
        <Modal.Content>
          {this.state.error ? <h5 style={{color: 'red'}}>Each team must have same number of people.</h5> : <div/>}
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => this.handleSave()} inverted>
            <Icon name='checkmark' /> Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpadesTeams);
