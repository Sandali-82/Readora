import Feather from '@react-native-vector-icons/feather';
import type { ComponentProps } from 'react';
import { theme } from '@/theme';

// All icons in the app go through this component, so they are always Feather icons.
type FeatherName = ComponentProps<typeof Feather>['name'];

type Props = {
  name: FeatherName;
  size?: number;
  color?: string;
};

export default function AppIcon({
  name,
  size = 24,
  color = theme.colors.text,
}: Props) {
  return <Feather name={name} size={size} color={color} />;
}