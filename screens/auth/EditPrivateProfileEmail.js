import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from '../../components/Button';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import * as actions from '../../global/actions';
import * as types from "../../global/types";
import {Input} from "../../components/Input";

class EditPrivateProfileEmail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailRepeat: ''
        };

        this.emailRef = React.createRef();
        this.emailRepeatRef = React.createRef();
    }

    handleChangeEmailPress(){
        if(this.state.email !== '' && this.checkFormEmail()){
            //    this.emailRef.current.clear();
            this.props.dispatch(actions.firebaseUpdateRequested({email: this.state.email}, types.metaTypes.email));
        } else if (this.state.email !== '' && !this.checkFormEmail()){
            alert("E-Mail ungueltig");
        }
    }

    handleCancelPress() {
        //todo clear inputs properly
        this.setState({userName: null, userPassword: null});
        this.props.navigation.navigate('EditPrivateProfile');
    }

    checkFormEmail(){
        return this.state.email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    }

    render() {
        let fehler = '';
        let updating = '';
        let oldEmail = firebase.auth().currentUser.email;
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
                    label={'Edit Email'}
                    placeholder={oldEmail}
                    onChangeText={email => this.setState({email: email})}
                    value={this.state.email}
                    inputRef={this.emailRef}
                />

                <Input
                    label={'Repeat E-Mai;'}
                    placeholder={oldEmail}
                    onChangeText={emailRepeat => this.setState({emailRepeat: emailRepeat})}
                    value={this.state.emailRepeat}
                    inputRef={this.emailRepeatRef}
                />

                <Button onPress={() => this.handleChangeEmailPress()}>
                    <Text>E-Mail aendern</Text>
                </Button>

                <Button onPress={() => this.handleCancelPress()}>
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

export default connect(stateToProps, null)(EditPrivateProfileEmail);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
