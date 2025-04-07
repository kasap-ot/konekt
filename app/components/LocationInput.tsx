import { Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps } from 'react-native-google-places-autocomplete';
import { GOOGLE_CLOUD_API_KEY } from 'config';
import { Colors } from 'styles/Colors';
import 'react-native-get-random-values'

interface LocationInputProps {
  placeholder?: string;
  inputStyle?: StyleProp<TextStyle>;
  listStyle?: StyleProp<ViewStyle>;
  googlePlacesProps?: Partial<GooglePlacesAutocompleteProps>;
  onLocationSelected?: (description: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  placeholder = 'Search for a place',
  inputStyle,
  listStyle,
  onLocationSelected: onPlaceSelected,
  googlePlacesProps = {},
}) => {
  const handlePlaceSelect = (data: any, details: any = null) => {
    if (onPlaceSelected) {
      onPlaceSelected(data.description);
    }
  };

  return (
    <>
      <Text style={styles.label}>Maps Location</Text>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        onPress={handlePlaceSelect}
        fetchDetails={false}
        query={{
          key: GOOGLE_CLOUD_API_KEY,
          language: 'en',
        }}
        styles={{
          container: styles.container,
          textInputContainer: styles.textInputContainer,
          textInput: [styles.input, inputStyle],
          listView: [styles.list, listStyle],
          row: styles.row,
          separator: styles.separator,
          poweredContainer: styles.poweredContainer,
        }}
        textInputProps={{placeholderTextColor: Colors.text.secondary}}
        {...googlePlacesProps}
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
  container: {
    marginBottom: 20,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: Colors.text.secondary,
    height: 50,
  },
  list: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 10,
    marginTop: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    backgroundColor: Colors.background.light,
    padding: 15,
    height: 50,
    borderBottomWidth: 0,
  },
  separator: {
    backgroundColor: Colors.border.light,
  },
  poweredContainer: {
    backgroundColor: Colors.background.light,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 8,
  },
});

export default LocationInput;