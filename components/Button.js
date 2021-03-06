import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({disabled, onPress, children}) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress}
                          style={disabled ? styles.buttonDisabled : styles.buttonEnabled}>
            <Text style={styles.text}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export {Button};

const styles = StyleSheet.create({
    buttonEnabled: {
        padding: 20,
        color: '#000',
        backgroundColor: '#4afff5',
    },
    buttonDisabled: {
        padding: 20,
        color: '#ffffff',
        backgroundColor: '#640007',
    },
    text: {
        fontWeight: "500",
    }
});