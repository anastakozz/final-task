import { CardMessage } from '@enums';
import SmallButton, { smallButtonClassesInactive } from '@components/buttons/smallButton/SmallButton';

interface SendButtonProps {
  isInCart: boolean;
  isSending: boolean;
}

export default function SendButton({ isInCart, isSending }: SendButtonProps) {
  if (isInCart && !isSending) {
    return (
      <button disabled className={smallButtonClassesInactive}>
        {CardMessage.inCart}
      </button>
    );
  } else if (isSending) {
    return (
      <button disabled className={smallButtonClassesInactive}>
        {CardMessage.inProgress}
      </button>
    );
  } else {
    return <SmallButton {...{ children: CardMessage.toCart }}></SmallButton>;
  }
}
