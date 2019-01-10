import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from '../../components/Button';
import * as firebase from 'firebase';
import { connect } from "react-redux";

class MatchScreen extends React.Component {

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
        console.log('global state user', this.props.user);

        return (
            <View style={styles.container}>
                <Text>
                    Matches
                </Text>
                <Text>
                    {this.props.user.name}
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
        user: state.user
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
