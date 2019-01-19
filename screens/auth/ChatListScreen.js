import React from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../global/actions';
import * as firebase from "firebase";
import { Button } from '../../components/Button';

class ChatListScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(actions.firebaseListenRequested('user/' + firebase.auth().currentUser.uid + '/chats', 'profile'));
    }

    handleNavigatePress(item){
        this.props.navigation.navigate('ChatScreen', { chatId: item});
    }

    renderItem(item) {
        return <Button>
            <Text>Das</Text>
        </Button>;
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={(item) => this.renderItem(item)}
                    data={Object.keys(this.props.chatList.liste)}
                    keyExtractor={(item, index) => item.index}
                />
            </View>
        );
    }
}

const stateToProps = (state) => {
    return {
        chatList: state.chatList,
    }
};

export default connect(stateToProps, null)(ChatListScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
});
