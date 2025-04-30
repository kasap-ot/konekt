import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from 'styles/Colors';

interface FormTextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'sentences'
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.text.secondary}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 20,
  },
  multilineInput: {
    height: 120,
  },
});

export default FormTextInput;