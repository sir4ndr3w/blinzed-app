import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {Input} from "../components/Input";
import {Button} from "../components/Button";

export default class ForgotPasswordScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userCredentials: "",
        }
    }

    handleResetPasswordPress = () => {
        //dispatch reset password
        //on send email show green
        //navigate back to login
    };

    handleCancelResetPress = () => {
        //clear field
        //back to login
        this.props.navigation.navigate('Login');
    };

    render() {
        return (
            <View style={styles.container}>
                <Input
                    label={'E-Mail oder Telefonnummer'}
                    placeholder={'max#muster.de'}
                    onChangeText={userCredentials => this.setState({userCredentials})}
                    value={this.state.userCredentials}
                />
                <Button onPress={() => this.handleResetPasswordPress()}>
                    Reset Password
                </Button>

                <Button onPress={() => this.handleCancelResetPress()}>
                    Abbrechen
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
