import React from 'react';
import { TouchableOpacity, Text, TextStyle, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../styles/globalStyles';

interface Props {
    title: string;
    onPress: () => void;
    style?: TextStyle;
}

const Link: React.FC<Props> = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={[styles.linkText, style]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

interface Styles {
    linkText: TextStyle;
    button: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    button: {
        alignItems: 'center',
    },
    linkText: {
        color: Colors.text.secondary,
        fontSize: 16,
        textDecorationLine: 'underline',
        marginTop: 15,
        alignItems: 'center',
    },
});

export default Link;