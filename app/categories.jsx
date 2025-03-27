import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../styles/globalStyles';


const CategoryButton = ({ category, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => onPress(category)}>
    <Text style={styles.buttonText}>{category}</Text>
  </TouchableOpacity>
);

const CategoriesPage = () => {
  const router = useRouter();
  const categories = ['Parties', 'Sport Events', 'Educational Events'];

  const handleButtonPress = (category) => {
    router.push({
      pathname: '/list-events',
      params: { category: category },
    });
  };

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <CategoryButton
          key={category}
          category={category}
          onPress={handleButtonPress}
          style={styles.categoryButton}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    padding: 10,
  },
  button: {
    width: '90%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10,
  },
  categoryButton: {
    backgroundColor: Colors.accent.primary,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
});

export default CategoriesPage;
