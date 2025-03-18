import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoriesPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CategoriesPage;