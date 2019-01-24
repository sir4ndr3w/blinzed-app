import React from 'react';
import {View, StyleSheet, Text, DatePickerIOS, DatePickerAndroid} from 'react-native';
import {Button} from "../components/Button";
import {Input} from "../components/Input";

export default class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            credential: "",
            password: "",
            birthdate: new Date(),
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
        this.setState({birthdate: newDate});
    };

    checkFormCompletion = () => {
        let validFirstName = this.state.firstName.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);
        let validLastName = this.state.lastName.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);
        let validPassword = this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/);

        let validEmail = this.state.credential.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);
        let validPhone = this.state.credential.match(/^([+ 0-9]{5,20})$/);

        console.log(validFirstName, validLastName, validPassword, validEmail, validPhone);

        return (validFirstName === null || validLastName === null || validPassword === null || validEmail === null);
    };

    render() {
        return (
            <View style={styles.container}>
                <Input
                    label={'Vorname'}
                    placeholder={'Max Muster'}
                    onChangeText={firstName => this.setState({firstName})}
                    value={this.state.firstName}
                />

                <Input
                    label={'Nachname'}
                    placeholder={'Max Muster'}
                    onChangeText={lastName => this.setState({lastName})}
                    value={this.state.lastName}
                />

                <Input
                    label={'E-Mail or Phone Number'}
                    placeholder={'Max Muster'}
                    onChangeText={credential => this.setState({credential})}
                    value={this.state.credential}
                />
                <Input
                    label={'Password'}
                    placeholder={'********'}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                />
                <DatePickerIOS
                    date={this.state.birthdate}
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
