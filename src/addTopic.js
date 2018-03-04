import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';

export default class addTopic extends React.Component {
	constructor(props) {
		super(props);
		this.state = { text: 'Enter Topic here' };
	}
	render() {
		return (
			<View>
        {/* big text box */}
				<TextInput
					style={styles.textBox}
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}
				/>
        {/* button */}
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
            {/* use the addToList function here */}
						this.props.screenProps.addToList({score: 0, topic: this.state.text});
            {/* navigate back to home screen */}
						this.props.navigation.goBack();
					}}
				>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textBox: {
		margin: 30,
		height: 100,
	},
	button: {
		alignSelf: 'flex-end',
		margin: 20,
		borderWidth:1,
		borderColor:'rgba(0,0,0,0)',
		width:100,
		height:50,
		backgroundColor:'#ddd',
		borderRadius:0,
	},
	buttonText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		alignItems: 'center'
	}
});