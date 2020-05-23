import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import { css } from "@emotion/core";
import Loader from "react-spinners/RingLoader";
import { API_URL, SOCKET_URL } from "../constants";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { createRoom, joinRoom } from '../redux/actions';
import {connect} from 'react-redux';
import * as socketClient from '../socket-api.js';

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    createRoom: (room) => dispatch(createRoom({'room': room})),
    joinRoom: (room) => dispatch(joinRoom({'room': room})),
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      isLoading: false,
      username: null,
      room: null,
      joined: false
    };

    this.handleJoin = this.handleJoin.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleJoin = () => {
    this.setState({ isLoading: true }, () => {
      axios.post(API_URL + '/join', {
        username: this.state.username,
        roomName: this.state.room
      })
        .then((response) => {
          var data = response.data;
          this.setState({
            isLoading: false,
            error: undefined,
            joined: true
          });

          data.username = this.state.username;
          socketClient.afterJoin(this.state.room, this.state.username);
          this.props.joinRoom(data);
        }).catch((error) => {
          if (error.response) {
            // Request made and server responded
            this.setState({
              isLoading: false,
              error: error.response.data
            });
          } else {
            this.setState({
              isLoading: false,
              error: 'Something went wrong :( Please try again later.'
            });
          }
        });
    });
  }

  handleCreate = () => {
    this.setState({ isLoading: true }, () => {
      axios.post(API_URL + '/new', {
        username: this.state.username,
        roomName: this.state.room
      })
        .then((response) => {
          var data = response.data;
          this.setState({
            isLoading: false,
            error: undefined,
            joined: true
          });

          data.username = this.state.username;
          socketClient.afterCreate(this.state.room, this.state.username);
          this.props.createRoom(data);

        }).catch((error) => {
          if (error.response) {
            // Request made and server responded
            this.setState({
              isLoading: false,
              error: error.response.data
            });
          } else {
            this.setState({
              isLoading: false,
              error: 'Something went wrong :( Please try again later.'
            });
          }
        });
    });
  }

  render() {
    if (this.state.joined){
      return(<Redirect to = "/room"/>);
    } else {
      return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <h1 style={{ color: '#44474d', fontFamily: 'PT Sans Narrow' }}>Zoom Rooms</h1>
            <Form size='large'>
              <Segment stacked style={{fontFamily: 'PT Sans Narrow'}}>
                <Form.Input name='username' fluid icon='user' iconPosition='left' placeholder='elonmusk' label='Username' value={this.state.username} onChange={this.handleChange} />
                <Form.Input
                  name='room'
                  fluid
                  icon='cube'
                  iconPosition='left'
                  placeholder='XAEA-12'
                  label='Room Name'
                  value={this.state.room}
                  onChange={this.handleChange}
                />

                <Button color='violet' fluid size='large' onClick={this.handleCreate} animated="fade">
                  <Button.Content visible style={{fontFamily: 'PT Sans Narrow'}}> Create Room </Button.Content>
                  <Button.Content hidden>
                    <Icon name='add circle' />
                  </Button.Content>
                </Button>
                <br />
                <Button color='green' fluid size='large' onClick={this.handleJoin} animated="fade">
                  <Button.Content visible style={{fontFamily: 'PT Sans Narrow'}}> Join Room </Button.Content>
                  <Button.Content hidden>
                    <Icon name='caret square down' />
                  </Button.Content>
                </Button>
              </Segment>
            </Form>
            <br />
            <Loader
              css={override}
              size={50}
              color={"#6377f7"}
              loading={this.state.isLoading}
            />
            {this.state.error !== undefined ? <Message color='red'>{this.state.error}</Message> : <div/>}
          </Grid.Column>
        </Grid>
      );
    }
  }
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default connect(null, mapDispatchToProps)(Home);
