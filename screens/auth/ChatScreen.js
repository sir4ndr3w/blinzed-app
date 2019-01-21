import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import * as actions from "../../global/actions";
import * as firebase from "firebase";
import { connect } from 'react-redux';

class ChatScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textInput: '',
            chatId: null
        }
    }

    componentDidMount() {
        const chatId = this.props.navigation.getParam('chatId', 'error');
        this.setState({
            chatId: chatId
        });

        if (chatId !== 'error') {
            //todo Wörter durch Types ersetzen und nicht selbst reinschreiben
            this.props.dispatch(actions.firebaseListenRequested('user/' + firebase.auth().currentUser.uid + '/chats' + chatId, 'messages'));
        }
    }

    render() {
        const messages = this.props.chats;

        return (
            <View style={styles.container}>
                <Text>
                    Chats
                </Text>
            </View>
        );
    }
}

const mapToProps = (state) => {
    return {
        chats: state.chats
    }
};

const mapPropsToState = () => {};

export default connect(mapToProps, mapPropsToState)(ChatScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
});
