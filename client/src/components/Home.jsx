import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';

class Home extends React.Component {
  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='blue' textAlign='center'>
            Zoom Rooms
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='elonmusk' label='Username'/>
              <Form.Input
                fluid
                icon='cube'
                iconPosition='left'
                placeholder='XAEA-12'
                label='Room Name'
              />

              <Button color='violet' fluid size='large'>
                Create Room
              </Button>
              <br/>
              <Button color='green' fluid size='large'>
                Join Room
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Home;
