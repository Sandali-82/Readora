import AuthStack from '@/navigation/AuthStack';
import MainTabs from '@/navigation/MainTabs';

// Temporary: the real value will come from the auth state in the authentication PR.
const IS_AUTHENTICATED = false;

export default function RootNavigator() {
  return IS_AUTHENTICATED ? <MainTabs /> : <AuthStack />;
}