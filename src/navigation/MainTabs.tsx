import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { ComponentProps } from 'react';
import FavouritesScreen from '@/features/favourites/screens/FavouritesScreen';
import HomeStack from '@/navigation/HomeStack';
import type { MainTabParamList } from '@/navigation/types';
import AppIcon from '@/shared/components/AppIcon';
import { theme } from '@/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IconName = ComponentProps<typeof AppIcon>['name'];

const renderTabIcon =
  (name: IconName) =>
  ({ color, size }: { color: string; size: number }) => (
    <AppIcon name={name} color={color} size={size} />
  );

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
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: renderTabIcon('home'),
        }}
      />
      <Tab.Screen
        name="FavouritesTab"
        component={FavouritesScreen}
        options={{
          title: 'Favourites',
          tabBarIcon: renderTabIcon('heart'),
        }}
      />
    </Tab.Navigator>
  );
}