import { Stack } from 'expo-router';
import { TouchableOpacity, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#1E90FF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <TouchableOpacity style={{ marginRight: 15 }} onPress={() => router.push('/event')}>
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Event</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginRight: 15 }} onPress={() => router.push('/create-event')}>
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Create Event</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginRight: 15 }} onPress={() => router.push('/categories')}>
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Categories</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/list-events')}>
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Events</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
}