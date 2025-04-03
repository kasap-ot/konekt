import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CreateEvent } from 'types';
import { Colors } from 'styles/globalStyles';


interface DateInputProps {
    setEvent: (newEvent: React.Dispatch<React.SetStateAction<CreateEvent>>) => void;
}


export const DateInput: React.FC<DateInputProps> = ({ setEvent }) => {
    const [date, setDate] = useState(new Date());
    const [isDatePickerShown, setIsDatePickerShown] = useState(false);

    function onDateChange(event: any, selectedDate?: Date) {
        if (Platform.OS === 'android') {
            setIsDatePickerShown(false);
        }

        if (selectedDate) {
            setDate(selectedDate);
        }



    }

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
}

const styles = StyleSheet.create({
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
})