import Expo from "expo";
import React from "react";
import App from "./src/App";

export default class App1 extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      MaterialIcons: require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
      // Lato: require('./assets/fonts/Lato-Regular.ttf'),
    });

    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <App />;
  }
}
