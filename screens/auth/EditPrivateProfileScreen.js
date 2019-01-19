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
        //todo check what fields have been changed

        if(this.state.email !== '' && this.checkFormEmail()){
        //    this.emailRef.current.clear();
            this.props.dispatch(action.firebaseUpdateRequested({email: this.state.email}, types.metaTypes.email));
        } else if (this.state.email !== '' && !this.checkFormEmail()){
            alert("E-Mail ungueltig");
        }

        if(this.state.password !== '' && this.checkFormPassword()){
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

    checkFormEmail(){
        return this.state.email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    }

    checkFormPassword(){
        return (this.state.password === this.state.passwordRepeat && this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/));
    }

    render() {
        let fehler = 'Ich bin Bob';
        console.log(this.props.profile);

        if(Object.keys(this.props.profile.error).length > 0){
            fehler = '';
            Object.keys(this.props.profile.error).map(function(value, index, arr){
                console.log(value);
                fehler += [arr[index]];
            });
            console.log(fehler);
        } else {
            console.log('Keine Errors');
        }

        return (
            <View style={styles.container}>
                <Text>
                    {fehler}
                </Text>

                <Input
                    label={'Edit Email'}
                    placeholder={this.props.profile.email}
                    onChangeText={email => this.setState({email: email})}
                    value={this.state.email}
                    inputRef={this.emailRef}
                />

                <Input
                    label={'Edit Password'}
                    placeholder={'********'}
                    onChangeText={password => this.setState({password: password})}
                    value={this.state.password}
                    inputRef={this.passwordRef}
                />

                <Input
                    label={'Repeat Password'}
                    placeholder={'********'}
                    onChangeText={passwordRepeat => this.setState({passwordRepeat: passwordRepeat})}
                    value={this.state.passwordRepeat}
                    inputRef={this.passwordRepeatRef}
                />

                <Button onPress={() => this.handleProfileUpdate()}>
                    <Text>Update Profile</Text>
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
        paddingTop: 20,
        backgroundColor: '#fff',
    },
});
