import React from 'react';
import { TouchableOpacity, Text, View, Platform, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../styles/globalStyles';


interface DateTimePickerInputProps {
    mode: 'date' | 'time';
    value: Date;
    onChange: (event: any, selectedDate?: Date) => void;
    label: string;
    minimumDate?: Date;
    is24Hour?: boolean;
}


const DateTimePickerInput: React.FC<DateTimePickerInputProps> = ({
    mode,
    value,
    onChange,
    label,
    minimumDate,
    is24Hour = false,
}) => {
    const [showPicker, setShowPicker] = React.useState(false);

    const displayValue = mode === 'date'
        ? value.toLocaleDateString()
        : value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const displayMode = Platform.OS === 'ios'
        ? (mode === 'date' ? 'inline' : 'spinner')
        : 'default';

    const handleChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }
        onChange(event, selectedDate);
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
                    value={value}
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