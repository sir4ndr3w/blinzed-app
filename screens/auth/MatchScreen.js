import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class MatchScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Matches
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
