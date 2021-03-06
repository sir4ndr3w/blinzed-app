import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';
import { firebaseConfig } from './constants/firebaseConfig';
import * as firebase from 'firebase';
import Layout from './constants/Layout';
import { store } from './global/store';
import { Provider } from 'react-redux';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadingComplete: false,
            isAuthenticationReady: false,
            isAuthenticated: false,
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = (user) => {
        this.setState({
            isAuthenticationReady: true,
            isAuthenticated: !!user,
        });
    };

    _loadResourcesAsync = async () => {
        // return Promise.all([
        //     Asset.loadAsync([
        //         require('./assets/images/robot-dev.png'),
        //         require('./assets/images/robot-prod.png'),
        //     ]),
        //     Font.loadAsync({
        //         // This is the font that we are using for our tab bar
        //         ...Icon.Ionicons.font,
        //         // We include SpaceMono because we use it in HomeScreen.js. Feel free
        //         // to remove this if you are not using it in your app
        //         'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        //     }),
        // ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };

    render() {
        if ((!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <Provider store={store}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay}/>}
                        {(this.state.isAuthenticated) ? <MainTabNavigator/> : <AppNavigator/>}
                    </View>
                </Provider>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Layout.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)',
    }
});
