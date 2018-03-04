import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import addTopic from './addTopic.js';
import {
  Card
} from 'react-native-elements';
let Upvote = require('react-upvote');

class HomeScreen extends React.Component {
  render() {
    let topics = this.props.screenProps.topics;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Text style={styles.header}>LIST OF TOPICS</Text>
          {
            topics.map((entry, index) => {
              return(
                <Card title={entry.topic} key={index} style={styles.card}>
                  <View style={styles.topic}>
                    <Text>{entry.topic}</Text>
                  </View>
                </Card>
              )
            })
          }
        </View>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigate('addTopic')}
        >
       </TouchableOpacity>
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { 
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
    },
  },
  addTopic: { screen: addTopic },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  listContainer: {
    flex: 1,
  },
  circleButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 20,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    width:70,
    height:70,
    backgroundColor:'#f00',
    borderRadius:100,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    alignSelf: 'stretch',
    textAlign: 'center',
  }
});


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };
  }

  addToList(newTopic) {
    this.setState({
      topics: [...this.state.topics, newTopic]
    });
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <SimpleApp screenProps={{topics: this.state.topics, addToList: this.addToList.bind(this)}}/>
    )
  }
}
