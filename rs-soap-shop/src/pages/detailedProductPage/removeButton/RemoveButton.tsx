import { RemoveMessage } from '@enums';
import { classesActive, classesDisabled } from '@constants';

export interface RemoveButtonProps {
  isInCart: boolean;
  isSending: boolean;
  onClick: () => void;
}

export default function RemoveButton({ isInCart, isSending, onClick }: RemoveButtonProps) {
  if (isInCart && !isSending) {
    return (
      <button role='active-button' className={classesActive} onClick={onClick}>
        {RemoveMessage.inCart}
      </button>
    );
  } else if (isSending) {
    return (
      <button role='loading-button' className={classesDisabled} disabled>
        {RemoveMessage.inProgress}
      </button>
    );
  } else {
    return (
      <button role='disabled-button' className={classesDisabled} disabled>
        {RemoveMessage.inCart}
      </button>
    );
  }
}
