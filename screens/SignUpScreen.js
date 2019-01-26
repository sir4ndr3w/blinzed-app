import React from 'react';
import {View, StyleSheet, Text, DatePickerIOS, DatePickerAndroid} from 'react-native';
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import * as firebase from "firebase";
import * as actions from '../global/actions';
import * as types from '../global/types';

export default class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userEmail: "",
            userPassword: "",
            userBirthdate: new Date(),
            error: '',
        };

        this.setBirthdate = this.setBirthdate.bind(this);
    }

    handleRegisterPress = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            //todo save success in state to show progress
            this.props.dispatch(actions.firebaseUpdateRequested({name: this.state.userName, birthdate: this.state.userBirthdate}, types.metaTypes.profile));
        }).catch((error) => {
            this.setState({error: error});
        });
    };

    handleCancelRegisterPress = () => {
        this.props.navigation.navigate('Login');
    };

    setBirthdate(newDate) {
        this.setState({userBirthdate: newDate});
    };

    checkFormCompletion = () => {
        let validName = this.state.userName.match(/^[A-z-]{1,}[ ][A-z-]{1,}([A-z]([- ]?[A-z]{2,})*)$/);
        let validPassword = this.state.userPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        let validEmail = this.state.userEmail.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

        return (validName === null || validPassword === null || validEmail === null);
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {this.state.error}
                </Text>
                <Input
                    label={'Full Name'}
                    placeholder={'Max Muster'}
                    onChangeText={userName => this.setState({userName})}
                    value={this.state.userName}
                />
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
                <DatePickerIOS
                    date={this.state.userBirthdate}
                    onDateChange={(newDate) => this.setBirthdate(newDate)}
                    mode={'date'}
                    maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                />
                <Button disabled={this.checkFormCompletion()} onPress={() => this.handleRegisterPress()}>
                    Login
                </Button>
                <Button onPress={() => this.handleCancelRegisterPress()}>
                    Cancel
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});
