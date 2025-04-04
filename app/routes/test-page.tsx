// app/routes/test-page.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../styles/Colors';

const TestPage = (): React.ReactElement => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerShown, setIsDatePickerShown] = useState(false);
  const [isTimePickerShown, setIsTimePickerShown] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    
    // Close the picker on Android after selection
    if (Platform.OS === 'android') {
      setIsDatePickerShown(false);
      setIsTimePickerShown(false);
    }
    
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setIsDatePickerShown(true);
    setIsTimePickerShown(false);
  };

  const showTimePicker = () => {
    setIsTimePickerShown(true);
    setIsDatePickerShown(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.selectedText}>
          Selected Date: {date.toLocaleDateString()}
        </Text>
        <Button 
          onPress={showDatePicker} 
          title="Select Date" 
          color={Colors.accent.primary}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.selectedText}>
          Selected Time: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Button 
          onPress={showTimePicker} 
          title="Select Time" 
          color={Colors.accent.secondary}
        />
      </View>

      {isDatePickerShown && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          minimumDate={new Date()} // Optional: disable past dates
        />
      )}

      {isTimePickerShown && (
        <DateTimePicker
          testID="timePicker"
          value={date}
          mode="time"
          display="default"
          onChange={onChange}
          is24Hour={false} // Set to true for 24-hour format
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    padding: 20,
  },
  text: {
    fontSize: 32,
    color: Colors.text.primary,
    marginBottom: 30,
  },
  pickerContainer: {
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  selectedText: {
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 15,
  },
});

export default TestPage;