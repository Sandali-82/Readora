import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectIsAuthenticated,
  selectIsRestoring,
} from '@/features/auth/authSlice';
import { restoreSession } from '@/features/auth/authThunks';
import AuthStack from '@/navigation/AuthStack';
import MainTabs from '@/navigation/MainTabs';
import LoadingView from '@/shared/components/LoadingView';

export default function RootNavigator() {
  const dispatch = useAppDispatch();
  const isRestoring = useAppSelector(selectIsRestoring);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (isRestoring) {
    return <LoadingView />;
  }

  return isAuthenticated ? <MainTabs /> : <AuthStack />;
}