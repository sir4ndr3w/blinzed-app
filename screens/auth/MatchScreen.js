import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from '../../components/Button';
import * as firebase from 'firebase';
import {connect} from "react-redux";
import * as actions from '../../global/actions';

class MatchScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loadImage: false,
        };

        this.loadMatch = this.loadMatch.bind(this);
        this.loadMedia = this.loadMedia.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleDecline = this.handleDecline.bind(this);
    }

    componentDidMount() {
        //getting seen matches
        this.props.dispatch(actions.firebaseListenRequested('user/private/' + firebase.auth().currentUser.uid, 'profile'));
        //getting new matches
        this.props.dispatch(actions.firebaseListenRequested('matches', 'female'));

        //todo calculate possible matches
    }

    loadMatch() {
        if(this.props.status.possibleMatches.length === 0){
            return this.props.dispatch(actions.loadMatch('user/' + firebase.auth().currentUser.uid + '/matches', 'initial_load'));
        } else {
            return this.props.dispatch(actions.loadMatch('user/' + firebase.auth().currentUser.uid + '/matches', 'regular_load'));
        }
    }

    loadMedia() {
        this.setState({loadImage: true});
    }

    handleAccept(uid) {
        this.setState({loadImage: false});
        this.props.dispatch(actions.firebaseUpdateRequested({matches: [this.props.status.declinedMatches, uid]}, 'accepted'));
        this.props.dispatch(actions.moveMatch('user/' + uid + '/matches', 'accept'));
    }

    handleDecline(uid) {
        this.setState({loadImage: false});
        this.props.dispatch(actions.firebaseUpdateRequested({matches: [this.props.status.declinedMatches, uid]}, 'decline'));
    }

    renderMatch() {
        return (
            <View style={styles.container}>
                <Text>
                    Matches
                </Text>

                <Text>
                    {this.props.currentMatch.name}
                </Text>

                {!this.state.loadImage && (
                    <Text onPress={() => this.loadMedia()}>
                        Klicken um Bild zu laden
                    </Text>
                )}
                {this.state.loadImage && (
                    <Text>
                        Bild geladen
                    </Text>
                )}

                <Button onPress={() => this.handleAccept(this.props.currentMatch.uid)}>
                    Ja
                </Button>
                <Button onPress={() => this.handleDecline(this.props.currentMatch.uid)}>
                    Nein
                </Button>
            </View>
        );
    };

    renderLoading() {
        return (
            <View class={styles.container}>
                Loading
            </View>

        );
    }

    render() {
        if (!this.props.currentMatch.loading) {
            return this.renderMatch();
        }

        return this.renderLoading();

    }
}

const stateToProps = (state) => {
    return {
        status: state,
        profile: state.profile,
        currentMatch: state.currentMatch,
    };
};

export default connect(stateToProps, null)(MatchScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
});
