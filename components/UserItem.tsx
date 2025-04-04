import React from 'react';
import { View, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { Colors } from '../styles/globalStyles';

interface Props {
    username: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const UserItem: React.FC<Props> = ({ username, style, textStyle }) => {
    return (
        <View style={[styles.userItem, style]}>
            <View style={styles.circle} />
            <Text style={[styles.username, textStyle]}>{username}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.accent.primary,
        marginRight: 12,
    },
    username: {
        fontSize: 18,
        color: Colors.text.primary,
    },
});

export default UserItem;