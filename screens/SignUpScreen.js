import React from 'react';
import {View, StyleSheet, Text, DatePickerIOS, DatePickerAndroid} from 'react-native';
import {Button} from "../components/Button";
import {Input} from "../components/Input";

export default class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userEmail: "",
            userPassword: "",
            userBirthdate: new Date(),
        };

        this.setBirthdate = this.setBirthdate.bind(this);
    }

    handleRegisterPress = () => {
        //dispatch register user
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
