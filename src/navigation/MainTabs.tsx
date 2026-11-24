import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavouritesScreen from '@/features/favourites/screens/FavouritesScreen';
import HomeStack from '@/navigation/HomeStack';
import type { MainTabParamList } from '@/navigation/types';
import { theme } from '@/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen
        name="FavouritesTab"
        component={FavouritesScreen}
        options={{ title: 'Favourites' }}
      />
    </Tab.Navigator>
  );
}