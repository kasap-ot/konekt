import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';

const TestModalPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Modal" onPress={() => setIsVisible(true)} />
      
      <Modal
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        animationType="slide"
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>This is a modal!</Text>
          <Button title="Close" onPress={() => setIsVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default TestModalPage;