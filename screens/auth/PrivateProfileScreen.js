import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class PrivateProfileScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Private Profile Screen
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
});
