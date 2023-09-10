import { CardMessage } from '../../../lib/enums';

interface AddButtonProps {
  isInCart: boolean;
  isSending: boolean;
  onClick: () => void;
}

export default function AddButton({ isInCart, isSending, onClick }: AddButtonProps) {
  if (isInCart && !isSending) {
    return <button disabled>{CardMessage.inCart}</button>;
  } else if (isSending) {
    return <button disabled>{CardMessage.inProgress}</button>;
  } else {
    return <button onClick={onClick} {...{ children: CardMessage.toCart }}></button>;
  }
}
