import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../styles/Colors';
import CategoryButton from '../components/CategoryButton';
import { EventCategory } from '../../types';

const CategoriesPage = (): React.ReactElement => {
  const router = useRouter();
  const categories: EventCategory[] = ['Parties', 'Sport Events', 'Educational Events'];

  const handleButtonPress = (category: EventCategory): void => {
    router.push({
      pathname: '/routes/list-events',
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

interface Styles {
  container: ViewStyle;
  button: ViewStyle;
  categoryButton: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
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