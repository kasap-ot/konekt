import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/globalStyles';

const Pill = ({ text, style }) => {
  return (
    <View style={[styles.pillContainer, style]}>
      <Text style={styles.pillText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    backgroundColor: Colors.text.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.background.primary,
  },
});

export default Pill;