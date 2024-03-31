import { classesActive, classesDisabled } from '@constants';
import { CardMessage } from '@enums';

export interface AddButtonProps {
  isInCart: boolean;
  isSending: boolean;
  onClick: () => void;
}

export default function AddButton({ isInCart, isSending, onClick }: AddButtonProps) {
  if (isInCart && !isSending) {
    return (
      <button role='disabled-button' className={classesDisabled} disabled>
        {CardMessage.inCart}
      </button>
    );
  } else if (isSending) {
    return (
      <button role='loading-button' className={classesDisabled} disabled>
        {CardMessage.inProgress}
      </button>
    );
  } else {
    return (
      <button
        role='active-button'
        className={classesActive}
        onClick={onClick}
        {...{ children: CardMessage.toCart }}
      ></button>
    );
  }
}
