import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LocationLinks() {
  const locations = [
    {
      name: 'Statue of Liberty',
      appUrl: 'comgooglemaps://?center=40.6892494,-74.0466891&q=Statue+of+Liberty',
      webUrl: 'https://maps.google.com/?q=Statue+of+Liberty@40.6892494,-74.0466891'
    },
    {
      name: 'Eiffel Tower',
      appUrl: 'comgooglemaps://?center=48.8583736,2.2922926&q=Eiffel+Tower',
      webUrl: 'https://maps.google.com/?q=Eiffel+Tower@48.8583736,2.2922926'
    },
    {
      name: 'Sydney Opera House',
      appUrl: 'comgooglemaps://?center=-33.8567844,151.213108&q=Sydney+Opera+House',
      webUrl: 'https://maps.google.com/?q=Sydney+Opera+House@-33.8567844,151.213108'
    },
  ];

  const openLocation = async (appUrl: string, webUrl: string) => {
    try {
      // First try opening in Google Maps app
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        await Linking.openURL(appUrl);
      } else {
        // Fallback to web URL if app isn't installed
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      alert(`Couldn't open the map: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Famous Locations</Text>
      
      {locations.map((location, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.locationItem}
          onPress={() => openLocation(location.appUrl, location.webUrl)}
        >
          <Ionicons name="location" size={24} color="#4285F4" />
          <Text style={styles.locationText}>{location.name}</Text>
          <Ionicons name="open-outline" size={20} color="#4285F4" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  locationText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});