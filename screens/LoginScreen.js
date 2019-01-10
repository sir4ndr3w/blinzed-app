import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userEmail: '',
            userPassword: '',
        }
    }

    handleLoginPress = () => {
      //store.dispatch('LOGIN_USER');
    };

    handleSignUpPress = () => {
        //dispatch navigation
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});
