import { useAuth } from './testAuth/AuthContext';
import Home from './testAuth/home';
import Login from './testAuth/login';
import { Text } from 'react-native';

function Root() {
  const { user, loading } = useAuth();

  console.log(user);

  if (loading) return <Text>Loading...</Text>;

  return user ? <Home /> : <Login />;
}

export default function App() {
  return (
    <Root />
  );
}