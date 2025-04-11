import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Platform, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from 'styles/Colors';

interface DateTimePickerInputProps {
    mode: 'date' | 'time';
    label: string;
    minimumDate?: Date;
    is24Hour?: boolean;
    onDateTimeChange: (dateTime: string) => void;
    initialDate?: Date;
}

const DateTimePickerInput: React.FC<DateTimePickerInputProps> = ({
    mode,
    label,
    minimumDate,
    is24Hour = false,
    onDateTimeChange,
    initialDate = new Date(),
}) => {
    const [dateTime, setDateTime] = useState(initialDate);
    const [showPicker, setShowPicker] = useState(false);

    const displayValue = mode === 'date'
        ? dateTime.toLocaleDateString()
        : dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const displayMode = Platform.OS === 'ios'
        ? (mode === 'date' ? 'inline' : 'spinner')
        : 'default';

    const handleChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }
        
        if (selectedDate) {
            setDateTime(selectedDate);
            onDateTimeChange(selectedDate.toISOString());
        }
    };

    return (
        <View style={styles.pickerSection}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowPicker(true)}
            >
                <Text style={styles.pickerText}>{displayValue}</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={dateTime}
                    mode={mode}
                    display={displayMode}
                    onChange={handleChange}
                    minimumDate={minimumDate}
                    is24Hour={is24Hour}
                />
            )}
        </View>
    );
};

interface Styles {
    pickerSection: ViewStyle;
    pickerButton: ViewStyle;
    pickerText: TextStyle;
    label: TextStyle;
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

export default DateTimePickerInput;