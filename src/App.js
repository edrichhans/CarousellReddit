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

{/*Home screen*/}
class HomeScreen extends React.Component {
  render() {
    {/*list of topics*/}
    let topics = this.props.screenProps.topics;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/* scrolling */}
        <ScrollView style={{paddingVertical: 20, alignSelf: 'stretch'}}>
          <View style={styles.listContainer}>
            <Text style={styles.header}>LIST OF TOPICS</Text>
            {this.showTop(topics)}
          </View>
        </ScrollView>
        {/* big red plus button */}
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigate('addTopic')}
        >
          <Entypo name="squared-plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  // function to list all the topics in JSX with sorting. */}
  showTop(topics) {
    return(
      topics
      // sort in descending order
      .sort((a,b) => {
        if (a.score > b.score)
          return -1;
        if (a.score < b.score)
          return 1;
        return 0;
      })
      // choose the first 20
      .slice(0,20)
      // make it JSX 
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

{/* main navigator */}
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


{/* Main App Component */}
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      // array of topics
      topics: []
    };
  }

  // function to add new topic
  addToList(newTopic) {
    this.setState({
      topics: [...this.state.topics, newTopic]
    });
  }

  // function to add to the score of a topic given an index
  addScore(index) {
    const topics = this.state.topics;
    topics[index].score += 1;

    // update state
    this.setState({
        topics,
    });
  }


  // function to subtract from the score of a topic given an index */}
  subtractScore(index) {
    const topics = this.state.topics;
    topics[index].score -= 1;

    {/* update state */}
    this.setState({
        topics,
    });
  }

  componentDidMount() {
    // hide the status bar
    StatusBar.setHidden(true);
  }

  render() {
    return (
      // pass all the functions to props
      <SimpleApp screenProps={{
        topics: this.state.topics,
        addToList: this.addToList.bind(this),
        addScore: this.addScore.bind(this),
        subtractScore: this.subtractScore.bind(this)
      }}/>
    )
  }
}
