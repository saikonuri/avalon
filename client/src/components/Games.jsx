import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Divider, List, Card } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Games.css';

const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
})

const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

const items = [
  {
    header: 'Avalon',
    href: 'javascript:void(0);',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews. Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: '5-10 Players',
    image: 'https://i.picsum.photos/id/1022/6000/3376.jpg'
  },
  {
    header: 'Coup',
    href: 'javascript:void(0);',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: '4-6 Players',
    image: 'https://i.picsum.photos/id/1022/6000/3376.jpg'
  },
  {
    header: 'Fishbowl',
    href: 'javascript:void(0);',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'Min 4',
    image: 'https://i.picsum.photos/id/1022/6000/3376.jpg'
  },
  {
    header: 'Codewords',
    href: 'javascript:void(0);',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test. Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'Min 4',
    image: 'https://i.picsum.photos/id/1022/6000/3376.jpg'
  },
  {
    header: 'Spyfall',
    href: 'javascript:void(0);',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test. Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: '4-10',
    image: 'https://i.picsum.photos/id/1022/6000/3376.jpg'
  },
]

class Games extends React.Component {
  render(){
    return(
      <div className="container">
        <Card.Group id="game-cards" items={items} centered/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
