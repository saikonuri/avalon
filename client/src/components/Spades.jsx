import { Button, Form, Dropdown, Header, Image, Message, Segment, Icon, Divider, List, Modal, Input } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Spades.css';
import '../cards/cards.css'
import * as socketClient from '../socket-api.js';

import SpadeHand from './SpadeHand.jsx';
import SpadeCard from './SpadeCard.jsx';
import SpadesTeams from './SpadesTeams';
//import {FaSkull} from 'react-icons/fa';
//import {GiSunflower, GiConsoleController} from 'react-icons/gi';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const colorMapping = {
  'red': '#b82720',
  'blue': '#3269fc',
  'yellow': '#e6c405',
  'black': 'black',
  'orange': '#f98d0b',
  'pink': '#f75b77',
  'green': '#03bb28',
  'grey': '#9ba29c'
};

class Spades extends React.Component {
  constructor(props) {
    super(props);

    this.getTopPlayers = this.getTopPlayers.bind(this);
    // this.getMiddlePlayers = this.getMiddlePlayers.bind(this);
    this.getBottomPlayers = this.getBottomPlayers.bind(this);

    this.getTopDiscards = this.getTopDiscards.bind(this);
    this.getBottomDiscards = this.getBottomDiscards.bind(this);

    this.handleStart = this.handleStart.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handlePredict = this.handlePredict.bind(this);
  }

  handleStart() {
    socketClient.sendSpades(this.props.room, this.props.user, 'START', null);
  }

  handleRestart() {
    socketClient.sendSpades(this.props.room, this.props.user, 'RESTART', null);
  }

  handlePredict(e, data){
    let done = false;
    if(this.props.game.teams[this.props.game.players[this.props.user].team].prediction >= 0){
      done = true;
    }
    socketClient.sendSpades(this.props.room, this.props.user, 'PREDICT', {user: this.props.user, prediction: data.value, done: done});
  }

  getTopPlayers(top) {
    let players = top;
    return (
      <div class="spades-top-players">
        {players.map((p) => {
          return (
            <div class="spades-top-player" style={{ color: colorMapping[p.team] }}>
              <h5>{p.user}</h5>
              <SpadeHand hand={p.hand} mine={p.user == this.props.user} />
              <div>Tricks won: {p.current}</div>
              <div>Target Tricks: {p.prediction}</div>
            </div>
          )
        })}
      </div>
    );
  }

  getTopDiscards(top) {
    let players = top;
    let turn = this.props.game.order[this.props.game.turn];

    let options = [{ key: 0, text: 0, value: 0 }];
    for (var i = 1; i <= this.props.game.round; i++) {
      options.push({ key: i, text: i, value: i });
    }

    return (
      <div class="spades-top-discards">
        {players.map((p) => {
          let predicted = this.props.game.teams[p.team].prediction > -1;
          let showInput = (turn === p.user) && (turn === this.props.user) && !predicted && this.props.game.round > 0;

          return (
            <div class="spades-discard">
              {showInput ?
                <div style={{ height: '100%', width: '100%', paddingTop: '20%' }}>
                  <strong style={{ color: 'white' }}>Select your prediction</strong>
                  <Dropdown
                    placeholder='Please select'
                    fluid
                    selection
                    options={options}
                    onChange={this.handlePredict}
                  />
                </div>
                : <div />}
              {p.card !== null ? <SpadeCard card={p.card} discard={true} /> : <div />}
            </div>
          );
        })}
      </div>
    );
  }

  getBottomDiscards(bottom) {
    let players = bottom;
    let turn = this.props.game.order[this.props.game.turn];

    let options = [{ key: 0, text: 0, value: 0 }];
    for (var i = 1; i <= this.props.game.round; i++) {
      options.push({ key: i, text: i, value: i });
    }

    return (
      <div class="spades-bottom-discards">
        {players.map((p) => {

          let predicted = this.props.game.teams[p.team].prediction > -1;
          let showInput = (turn === p.user) && (turn === this.props.user) && !predicted && this.props.game.round > 0;
          let skipInput = (turn === p.user) && (turn === this.props.user) && predicted && this.props.game.round > 0;
          console.log(skipInput);
          if(skipInput && this.props.game.stage === "PREDICT"){
            this.handlePredict(null, this.props.game.teams[p.team].prediction);
          }
          return (
            <div class="spades-discard">
              {showInput ?
                <div style={{ height: '100%', width: '100%', paddingTop: '20%' }}>
                  <strong style={{ color: 'white' }}>Select your prediction</strong>
                  <Dropdown
                    placeholder='Please select'
                    fluid
                    selection
                    options={options}
                    onChange={this.handlePredict}
                  />
                </div>
                : <div />}
              {p.card !== null ? <SpadeCard card={p.card} discard={true} /> : <div />}
            </div>
          );
        })}
      </div>
    );
  }

  getBottomPlayers(bottom) {
    let players = bottom;
    return (
      <div class="spades-bottom-players">
        {players.map((p) => {
          return (
            <div class="spades-bottom-player" style={{ color: colorMapping[p.team] }}>
              <h5>{p.user}</h5>
              <SpadeHand hand={p.hand} mine={p.user == this.props.user} />
              <div>Tricks won:   {p.current}</div>
              <div>Target Tricks:   {p.prediction}</div>
            </div>
          )
        })}
      </div>
    );
  }

  // getMiddlePlayers(){

  // }

  render() {
    let game = this.props.game;
    console.log(game);
    let top = [];
    let bottom = [];
    let topDiscard = [];
    let bottomDiscard = [];

    for (var i = 0; i < game.order.length; i++) {
      let player = game.players[game.order[i]];
      let pConcat = { user: game.order[i], ...player, ...game.teams[player.team] };

      if (i < 4) {
        bottom.push(pConcat);
        bottomDiscard.push({ user: game.order[i], card: null, team: player.team });
      }
      else {
        top.push(pConcat);
        topDiscard.push({ user: game.order[i], card: null, team: player.team });
      }
    }
    top.reverse();

    let access = (this.props.creator === this.props.user) && (this.props.game.round === 0);

    return (
      <div class="spades-parent">
        <div class="spades-container">
          <div class="spades-area">
            {this.getTopPlayers(top)}
            <div class="spades-middle">

              <div class="spades-table">
                {(this.props.game.round == 0) && (this.props.creator !== this.props.user) ? <h4>Waiting for host...</h4> : <div />}
                {(this.props.game.round > 0) && (this.props.game.order[this.props.game.turn] !== this.props.user) ? <strong style={{ color: 'white' }}>Waiting for {this.props.game.order[this.props.game.turn]}...</strong> : <div />}
                {this.getTopDiscards(topDiscard)}
                <div class="spades-settings">
                  <Button onClick={() => this.handleStart()} compact color="yellow" disabled={!access}>Start</Button>
                  <SpadesTeams />
                  <Button onClick={() => this.handleRestart()} compact color="orange" disabled={this.props.creator !== this.props.user}>Restart</Button>
                </div>
                {this.getBottomDiscards(bottomDiscard)}
              </div>

            </div>
            {this.getBottomPlayers(bottom)}
          </div>
        </div>
        <DenseTable players={this.props.game.players} teams={this.props.game.teams} order={this.props.game.order} />
      </div>
    );
  }
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createRows(props) {
  let rows = [];
  {
    props.order.map((p) => {
      var player = props.players[p];
      var team = props.teams[player.team];
      rows.push({ user: p, points: team.points, bags: team.bags, color: player.team });
    })
  }
  return rows;
}

function DenseTable(props) {
  const classes = useStyles();
  let rows = createRows(props);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead style={{ backgroundColor: '#323232' }}>
          <TableRow>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Player</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Points</TableCell>
            <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Bags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.user}>
              <TableCell component="th" scope="row" style={{ color: colorMapping[row.color] }}>
                <strong>{row.user}</strong>
              </TableCell>
              <TableCell align="left">{row.points}</TableCell>
              <TableCell align="left">{row.bags}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Spades);
