import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as action from '../../global/actions';
import * as types from '../../global/types';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';

class EditPrivateProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordRepeat: '',
        };

        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordRepeatRef = React.createRef();

    }

    handleProfileUpdate() {
        //todo email und password auf getrennten Seiten aendern sonst ist die Session ungueltig

        if(this.state.password !== ''){
        //    this.passwordRef.current.clear();
            this.props.dispatch(action.firebaseUpdateRequested({password: this.state.password}, types.metaTypes.password));
        } else if (this.state.password !== '' && !this.checkFormPassword()){
            alert("Passwort ungueltig oder keine Uebereinstimmung");
        }
    }

    handleCancelUpdate() {
        //todo clear inputs properly
        this.setState({userName: null, userPassword: null});
        this.props.navigation.navigate('Profile');
    }

    handleEmailChangePress(){
        this.props.navigation.navigate('EditPrivateProfileEmail');
    }

    handlePasswordChangePress(){
        this.props.navigation.navigate('EditPrivateProfilePassword');
    }

    checkFormPassword(){
        console.log(this.state.password, this.state.password === this.state.passwordRepeat, this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/));

        return (this.state.password === this.state.passwordRepeat && this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/));
    }

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => this.handleEmailChangePress()}>
                    Email wechseln
                </Button>
                <Button onPress={() => this.handlePasswordChangePress()}>
                    <Text>Password wechseln</Text>
                </Button>

                <Button onPress={() => this.handleCancelUpdate()}>
                    <Text>Abbrechen</Text>
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

export default connect(stateToProps, null)(EditPrivateProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
