import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../styles/globalStyles';

interface DateInputProps {
    date: Date;
    isDatePickerShown: boolean;
    setIsDatePickerShown: (shown: boolean) => void;
    onDateChange: (event: any, selectedDate?: Date) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ date, isDatePickerShown, setIsDatePickerShown, onDateChange }) => {
    return (
        <View style={styles.pickerSection}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={() => setIsDatePickerShown(true)}>
                <Text style={styles.pickerText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {isDatePickerShown && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={onDateChange}
                    minimumDate={new Date()}
                />
            )}
        </View>
    );
};

interface TimeInputProps {
    time: Date;
    isTimePickerShown: boolean;
    setIsTimePickerShown: (shown: boolean) => void;
    onTimeChange: (event: any, selectedTime?: Date) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({ time, isTimePickerShown, setIsTimePickerShown, onTimeChange }) => {
    return (
        <View style={styles.pickerSection}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={() => setIsTimePickerShown(true)}>
                <Text style={styles.pickerText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            {isTimePickerShown && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onTimeChange}
                    is24Hour={false}
                />
            )}
        </View>
    );
};

interface Styles {
    pickerSection: ViewStyle;
    label: TextStyle;
    pickerButton: ViewStyle;
    pickerText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    pickerSection: {
        marginBottom: 20,
    },
    pickerButton: {
        borderRadius: 8,
        padding: 15,
        backgroundColor: Colors.background.secondary,
    },
    pickerText: {
        fontSize: 16,
        color: Colors.text.secondary,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text.primary,
        marginBottom: 8,
    },
});
