import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from '../../components/Button';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import * as actions from '../../global/actions';

class MatchScreen extends React.Component {

    componentDidMount(){
        this.props.dispatch(actions.firebaseListenRequested('user/' + firebase.auth().currentUser.uid, 'profile'));
    }

    handleLogoutPress = () => {
            firebase.auth().signOut()
                .then(() => {
                    this.setState({user: null});
                })
                .catch(function (error) {
                    alert(error.message);
                });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Matches
                </Text>
                <Text>
                    {this.props.profile.isLoaded ? this.props.profile.name : 'Test'}
                </Text>
                <Button onPress={this.handleLogoutPress}>
                    Logout
                </Button>
            </View>
        );
    }
}

const stateToProps = (state) => {
    return {
        profile: state.profile
    };
};

export default connect(stateToProps, null)(MatchScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
});
