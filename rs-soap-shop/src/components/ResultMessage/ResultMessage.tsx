import { ResultProps } from '@interfaces';
import SuccessMessage from './successMessage.tsx';
import ErrorMessage from './errorMessage.tsx';

export default function ResultMessage({ isSuccess, isVisible, message, disableRedirect }: ResultProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div data-testid='reg-result-message'>
      {isSuccess ? (
        <SuccessMessage text={message} disableRedirect={disableRedirect} />
      ) : (
        <ErrorMessage message={message} />
      )}
    </div>
  );
}
