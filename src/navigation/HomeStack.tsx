import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '@/features/books/screens/DetailsScreen';
import HomeScreen from '@/features/books/screens/HomeScreen';
import SearchScreen from '@/features/books/screens/SearchScreen';
import type { HomeStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}