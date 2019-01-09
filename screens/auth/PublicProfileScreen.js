import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class PublicProfileScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Public Profile
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
