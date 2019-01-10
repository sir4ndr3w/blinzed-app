import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const Input = ({label, value, onChangeText, placeholder, secureTextEntry}) => {
  return (
      <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            autoCorrect={false}
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={styles.input}
            secureTextEntry = {secureTextEntry}
          />
      </View>
  );
};

export { Input };

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    label: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: '#333',
        fontSize: 16,
        fontWeight: "600",
    },
    input: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: '#333',
        fontSize: 16,
        fontWeight: "200",
    }
});