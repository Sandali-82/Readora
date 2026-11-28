import EmptyView from '@/shared/components/EmptyView';

type Props = {
  message?: string;
  onRetry: () => void;
};

export default function ErrorView({
  message = 'Check your connection and try again.',
  onRetry,
}: Props) {
  return (
    <EmptyView
      icon="alert-circle"
      title="Something went wrong"
      message={message}
      actionLabel="Try again"
      onAction={onRetry}
    />
  );
}