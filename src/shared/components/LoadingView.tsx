import { ActivityIndicator } from 'react-native';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function LoadingView() {
  return (
    <ScreenContainer centered>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </ScreenContainer>
  );
}