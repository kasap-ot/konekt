import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Colors} from '../styles/globalStyles';


const CategoryButton = ({ category, onPress, style }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={() => onPress(category)}>
        <Text style={styles.buttonText}>{category}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({

    button: {
        width: '90%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text.primary,
    },
});

export default CategoryButton;