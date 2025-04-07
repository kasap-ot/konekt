import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Colors } from '../styles/Colors';

interface Props {
    title: string;
    style?: TextStyle;
}

const Header: React.FC<Props> = ({ title, style }) => {
    return (
        <View style={styles.header}>
            <Text style={[styles.title, style]}>
                {title}
            </Text>
        </View>
    );
};

interface Styles {
    title: TextStyle;
    header: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text.primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    header: {
        backgroundColor: Colors.background.primary,
        padding: 15,
        alignItems: 'center',
    },
})

export default Header;