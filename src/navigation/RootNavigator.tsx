import { useAppSelector } from '@/app/hooks';
import { selectIsAuthenticated } from '@/features/auth/authSlice';
import AuthStack from '@/navigation/AuthStack';
import MainTabs from '@/navigation/MainTabs';

export default function RootNavigator() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? <MainTabs /> : <AuthStack />;
}