import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button} from '../../components/Button';
import {connect} from 'react-redux';
import * as firebase from "firebase";

class PrivateProfileScreen extends React.Component {

    handleNavigateProfile() {
        this.props.navigation.navigate('EditPrivateProfile');
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
                    Private Profile Screen
                </Text>

                {/*{this.props.profile.isLoaded && (*/}
                    {/*this.props.profile.map((item, key) => {*/}
                        {/*return <Text>{key}:{item}</Text>*/}
                    {/*})*/}
                {/*)}*/}

                <Button onPress={() => this.handleNavigateProfile()}>
                    <Text>Edit Profile</Text>
                </Button>

                <Button onPress={this.handleLogoutPress}>
                    Logout
                </Button>

            </View>
        );
    }
}

const mapToProps = (state) => {
    return {
        profile: state.profile
    }
};

export default connect(mapToProps, null)(PrivateProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
});
