# Carousell Coding Challenge
This project was created for Carousell's coding challenge. The app is created using React Native, and is built for Android platforms.
## Installation
This project is created using the Create React Native App. 

### APK
The APK can be accessed here:
https://exp-shell-app-assets.s3-us-west-1.amazonaws.com/android%2F%40edrichhans%2Fcarousellreddit-84d77f5c-1f9c-11e8-89aa-0a580a782815-signed.apk


## Usage
The app is able to do the following:
* Maintain a list of topics and its upvotes/downvotes
* Allow the user to submit topics. A “topic” is simply a string that does not exceed 255 characters.
* Allow the user to upvote or downvote a topic. The user may upvote or downvote the same topic multiple times.
* Always return a list of top 20 topics (sorted by upvotes, descending) on the homepage.

## Functionality
### App
`export default class App extends React.Component`
is the main React Component that keeps the list of topics as its state variable.

#### Functions
* `addToList(newTopic)` - Inserts `newTopic` to `this.state.topics`.
* `addScore(index)` - Increments the `score` attribute of the topic indexed at `index`.
* `subtractScore(index)` - Decrements the `score` attribute of the topic indexed at `index`.

#### topic
A topic is an item in `this.state.topics`, having two attributes:
1. score
2. topic


### SimpleApp
A badly named Stack Navigator. Has two screens:
1. HomeScreen
2. addTopic

### HomeScreen
The main view.
Lists out top 20 topics in descending order, with each topic having an up and down button to upvote/downvote and change the score.
It has a big red button that calls `addTopic`.

#### Functions
* showTop - The function that returns JSX based on the items in `this.props.screenProps.topics`.

### addTopic
The view to add a new topic. Has a simple text box and submit button. It creates a new entry using the `addToList` function.

