import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import addTopic from './addTopic.js';
import {
  Card,
  CheckBox
} from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

class HomeScreen extends React.Component {
  render() {
    let topics = this.props.screenProps.topics;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={{paddingVertical: 20, alignSelf: 'stretch'}}>
          <View style={styles.listContainer}>
            <Text style={styles.header}>LIST OF TOPICS</Text>
            {this.showTop(topics)}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigate('addTopic')}
        >
          <Entypo name="squared-plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  showTop(topics) {
    return(
      topics
      .sort((a,b) => {
        if (a.score > b.score)
          return -1;
        if (a.score < b.score)
          return 1;
        return 0;
      })
      .slice(0,20)
      .map((entry, index) => {
        return(
          <Card title={entry.topic} key={index} containerStyle={styles.card}>
            <View style={styles.votes}>
              <Entypo name="chevron-up" size={20} color="black" onPress={() => this.props.screenProps.addScore(index)} />
              <Entypo name="chevron-down" size={20} color="black" onPress={() => this.props.screenProps.subtractScore(index)} />
              <Text>Score: {entry.score}</Text>
            </View>
          </Card>
        )
      })
    )
  }
}

const SimpleApp = StackNavigator({
  Home: { 
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
    },
  },
  addTopic: {
    screen: addTopic,
    navigationOptions: {
      title: 'Add Topic',
    },
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  circleButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
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
    margin: 5,
  },
  card: {
    alignSelf: 'stretch',
  },
  votes: {
    flexDirection: 'row',
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

  addScore(index) {
    const topics = this.state.topics;
    topics[index].score += 1;

    // update state
    this.setState({
        topics,
    });
  }

  subtractScore(index) {
    const topics = this.state.topics;
    topics[index].score -= 1;

    // update state
    this.setState({
        topics,
    });
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <SimpleApp screenProps={{
        topics: this.state.topics,
        addToList: this.addToList.bind(this),
        addScore: this.addScore.bind(this),
        subtractScore: this.subtractScore.bind(this)
      }}/>
    )
  }
}
