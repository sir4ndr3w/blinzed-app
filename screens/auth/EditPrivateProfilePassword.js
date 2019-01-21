import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import * as action from '../../global/actions';
import * as types from '../../global/types';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';

class EditPrivateProfilePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordRepeat: '',
        };

        this.passwordRef = React.createRef();
        this.passwordRepeatRef = React.createRef();
    }

    handlePasswordUpdate() {
        if(this.state.password !== ''){
            //    this.passwordRef.current.clear();
            this.props.dispatch(action.firebaseUpdateRequested({password: this.state.password}, types.metaTypes.password));
            this.setState({...this.state, password: '', passwordRepeat: ''});
            Keyboard.dismiss();
        } else if (this.state.password !== '' && !this.checkFormPassword()){
            alert("Passwort ungueltig oder keine Uebereinstimmung");
        }
    }

    handleCancelUpdate() {
        //todo clear inputs properly
        this.setState({...this.state, password: '', passwordRepeat: ''});
        Keyboard.dismiss();
        setTimeout(() => {this.props.navigation.navigate('EditPrivateProfile');}, 200);
    }

    checkFormPassword(){
        return (this.state.password === this.state.passwordRepeat && this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/));
    }

    render() {
        let fehler = '';
        let updating = '';
        let errors = this.props.profile.error;
        let inProgress = this.props.profile.inProgress;

        if(Object.keys(inProgress).length > 0){
            updating = '';
            Object.keys(inProgress).map(function(value, index, arr){
                updating += value;
            });
        }

        if(Object.keys(errors).length > 0){
            fehler = '';
            Object.keys(errors).map(function(value, index, arr){
                fehler += errors[value];
            });
        }

        return (
            <View style={styles.container}>
                <Text>
                    {fehler}
                </Text>
                <Text>
                    {updating}
                </Text>
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

                <Button onPress={() => this.handlePasswordUpdate()}>
                    <Text>Change Password</Text>
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

export default connect(stateToProps, null)(EditPrivateProfilePassword);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
