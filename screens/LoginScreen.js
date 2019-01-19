import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { connect } from 'react-redux';
import * as action from '../global/actions';
import * as firebase from 'firebase';

class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userEmail: '',
            userPassword: '',
        }
    }

    handleLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword)
            .then(() => {
            }, (error) => {
                console.log(error);
                switch (error.message) {
                    case 'The email address is badly formatted.':
                        alert('Ungueltige E-Mailadresse.');
                        break;
                    case 'The password is invalid or the user does not have a password.':
                        alert('Falsches Passwort oder kein Passwort angegeben.');
                        break;
                    case 'There is no user record corresponding to this identifier. The user may have been deleted.':
                        alert('Falsche E-Mail oder falsches Passwort.');
                        break;
                    default:
                        alert(error.message);
                }
            });
    };

    handleSignUpPress = () => {
        this.props.navigation.navigate('SignUp');
    };

    handleForgotPasswordPress = () => {
        this.props.navigation.navigate('ForgotPassword');
    };

    render() {
        return (
            <View style={styles.container}>
                <Input
                    label={'E-Mail or Phone Number'}
                    placeholder={'Max Muster'}
                    onChangeText={userEmail => this.setState({userEmail})}
                    value={this.state.userEmail}
                />
                <Input
                    label={'Password'}
                    placeholder={'********'}
                    onChangeText={userPassword => this.setState({userPassword})}
                    value={this.state.userPassword}
                />
                <Button onPress={() => this.handleLoginPress()}>
                    Login
                </Button>
                <Button onPress={() => this.handleSignUpPress()}>
                    Sign Up
                </Button>
                <Button onPress={() => this.handleForgotPasswordPress()}>
                    Forgot Password
                </Button>
            </View>
        );
    }
}

export default connect(null,null)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});
