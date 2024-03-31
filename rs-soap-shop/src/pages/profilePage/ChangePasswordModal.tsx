import { useState } from 'react';
import { Input } from '@components/forms/inputs/Input';
import { passwordValidation } from '@utils/inputValidations';
import AdditionalButton from '@components/buttons/additionalButton';
import { changePassword } from '@services/account.service';
import { handleRelogin } from '@services/handleLogin';
import { validatePassword } from '@components/forms/validateFunctions/password';

type ChangePasswordModalProps = {
  email: string;
  id: string;
  version: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ChangePasswordModal({ email, id, version, onClose, onSuccess }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCancel = () => {
    onClose();
  };
  const handleSave = () => {
    setIsSubmitted(true);
    const passwordValidationResult: string | undefined = validatePassword(newPassword);

    if (!passwordValidationResult && newPassword == confirmPassword) {
      changePassword(id, version, currentPassword, newPassword)
        .then(() => {
          handleRelogin(email, newPassword).then(() => {
            onClose();
            onSuccess();
          });
        })
        .catch(error => {
          setError(error.response.data.message);
        });
    } else {
      setError('New passwords are not equal');
    }
  };

  return (
    <div data-testid='changr-password-modal'>
      <div onClick={onClose} className='w-full h-full bg-grayLColor opacity-30 fixed z-10 top-0 left-0'></div>
      <div className='z-20 bg-secondaryColor dark:bg-grayLColor dark:text-secondaryColor fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-normal p-2 md:px-sm md:py-sm border-accentColor dark:border-secondaryColor border-8'>
        <h4 className='text-h4 text-accentColor dark:text-basicColor'>Enter your current password:</h4>
        <Input
          {...passwordValidation}
          isSubmitted={isSubmitted}
          label=''
          isColumn={true}
          onChange={(newValue: string) => setCurrentPassword(newValue)}
        />
        <h4 className='text-h4 text-accentColor dark:text-basicColor'>Enter your new password:</h4>
        <Input
          {...passwordValidation}
          isSubmitted={isSubmitted}
          label=''
          isColumn={true}
          onChange={(newValue: string) => setNewPassword(newValue)}
        />
        <h4 className='text-h4 text-accentColor dark:text-basicColor'>Confirm new password:</h4>
        <Input
          {...passwordValidation}
          isSubmitted={isSubmitted}
          label=''
          isColumn={true}
          onChange={(newValue: string) => setConfirmPassword(newValue)}
        />
        {error && (
          <div className='bg-errorColor p-4 rounded-md mb-8 flex'>
            <img src='/images/attention-circle-svgrepo-com.svg' alt='' width='24px' className='mr-4' />
            <p>{error}</p>
          </div>
        )}
        <div className='flex flex-col md:flex-row items-center justify-center'>
          <AdditionalButton onClick={handleSave}>Save</AdditionalButton>
          <AdditionalButton onClick={handleCancel}>Cancel</AdditionalButton>
        </div>
      </div>
    </div>
  );
}
