import React from 'react';
import { View, Text, TextStyle, StyleSheet } from 'react-native';
import { Colors } from '../styles/globalStyles';

interface Props {
    message: string;
    style?: TextStyle;
}

const EmptyState: React.FC<Props> = ({ message, style }) => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, style]}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: Colors.text.primary,
        fontSize: 18,
    },
});

export default EmptyState;