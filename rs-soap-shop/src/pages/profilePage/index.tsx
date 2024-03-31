import React, { useEffect, useState } from 'react';
import { getAccountData, updateAccountData } from '@services/account.service';
import { AddressCardI } from '@interfaces';
import EmptyButton from '@components/buttons/emptyButton';
import BannerPageName from '@components/bannerPageName';
import AddressCard from '@components/addressCard';
import EditIcon from '@icons/editIcon';
import AdditionalButton from '@components/buttons/additionalButton';
import { Input } from '@components/forms/inputs/Input';
import { dateValidation, emailValidation, nameValidation } from '@utils/inputValidations';
import SuccessMessage from '@components/ResultMessage/successMessage.tsx';
import ErrorMessage from '@components/ResultMessage/errorMessage.tsx';
import ChangePasswordModal from './ChangePasswordModal';
import CreateNewAddressModal from './CreateNewAddressModal';
import scrollToTop from '@utils/scrollToTop';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '@components/forms/validateFunctions/e-mail';
import { validateDate } from '@components/forms/validateFunctions/date';
import { validateName } from '@components/forms/validateFunctions/name';

const countries = [
  {
    code: 'IT',
    country: 'Italy'
  },
  {
    code: 'ES',
    country: 'Spain'
  },
  {
    code: 'DE',
    country: 'Germany'
  }
];

export function dataAdapterToFullName(code: string): string {
  return countries.find(el => el.code == code).country;
}

function ProfilePage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMainData, setEditMainData] = useState(false);
  const [createAddress, setCreateAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [editPasswordOpen, setEditPasswordOpen] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [mainDataForm, setMainDataForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [actions, setActions] = useState([]);

  const handleEdit = () => {
    setEditMainData(true);
    setMainDataForm({
      firstName: account?.firstName,
      lastName: account?.lastName,
      dateOfBirth: account?.dateOfBirth,
      email: account?.email
    });
  };
  const handleChangeInput = (actionKey: string, key: string, newValue: string) => {
    setActions(
      actions.find(el => el.action == actionKey)
        ? actions.map(el => (el.action == actionKey ? { ...el, [key]: newValue } : el))
        : [...actions, { action: actionKey, [key]: newValue }]
    );
    setMainDataForm({ ...mainDataForm, [key]: newValue });
  };

  const validateFields = () => {
    setIsSubmitted(true);

    return (
      !validateName(mainDataForm.firstName) &&
      !validateName(mainDataForm.lastName) &&
      !validateDate(mainDataForm.dateOfBirth) &&
      !validateEmail(mainDataForm.email)
    );
  };

  const handleSave = () => {
    if (validateFields()) {
      updateAccountData(account?.id, account?.version, actions)
        .then(resp => {
          setEditMainData(false);
          setAccount(resp.data);
          setDataUpdated(true);
        })
        .catch(() => {
          setError('Something went wrong');
        });
    }
  };
  const handleEditPassword = () => {
    setEditPasswordOpen(true);
  };

  const handleCancel = () => {
    setEditMainData(false);
  };

  const handleCreateNewAddress = () => {
    setCreateAddress(true);
  };

  const handleDeleteAddress = (id: string) => {
    const actions = [
      {
        action: 'removeAddress',
        addressId: id
      }
    ];
    updateAccountData(account?.id, account?.version, actions)
      .then(resp => {
        setAccount(resp.data);
        setDataUpdated(true);
      })
      .catch(() => {
        setError('Something went wrong');
      });
  };

  const handleEditAddress = (address: AddressCardI) => {
    setCreateAddress(true);
    setEditAddress(address);
  };

  const refreshAccount = () => {
    setLoading(true);
    getAccountData()
      .then(resp => {
        setLoading(false);
        setAccount(resp.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    scrollToTop();
    if (!localStorage.getItem('userToken')) {
      navigate('/sign-in');
    } else {
      refreshAccount();
    }
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='bg-secondaryColor dark:bg-graySColor'>
          <BannerPageName>My Profile</BannerPageName>
          <div onClick={() => setDataUpdated(false)} data-testid='reg-result-message'>
            {dataUpdated && <SuccessMessage disableRedirect={true} text={'Account data has been updated'} />}
            {error && <ErrorMessage message={error} />}
          </div>
          {editPasswordOpen && (
            <ChangePasswordModal
              email={account.email}
              id={account.id}
              version={account.version}
              onClose={() => setEditPasswordOpen(false)}
              onSuccess={() => {
                setDataUpdated(true);
                refreshAccount();
              }}
            />
          )}
          {createAddress && (
            <CreateNewAddressModal
              onClose={() => {
                setCreateAddress(false);
                setEditAddress(null);
              }}
              account={account}
              address={editAddress}
              onSuccess={() => {
                setDataUpdated(true);
                refreshAccount();
                setError(null);
              }}
              onError={e => setError(e)}
            />
          )}
          <div className='py-sm px-sm max-w-[1440px] mx-auto lg:px-big'>
            <div>
              <div className='border-b-2 border-accentColor dark:border-basicColor p-2 flex justify-between items-center mb-4'>
                <h3 className='text-h3 text-accentColor dark:text-basicColor font-bold'>My personal information</h3>
                {editMainData ? (
                  <div className='flex flex-col md:flex-row items-center justify-center'>
                    <AdditionalButton onClick={handleSave}>Save</AdditionalButton>
                    <AdditionalButton onClick={handleCancel}>Cancel</AdditionalButton>
                  </div>
                ) : (
                  <button onClick={handleEdit}>
                    <EditIcon />
                  </button>
                )}
              </div>
              <div>
                <h4 className='text-h4 text-accentColor dark:text-basicColor'>First Name:</h4>
                {editMainData ? (
                  <Input
                    {...nameValidation}
                    label=''
                    isColumn={true}
                    isSubmitted={isSubmitted}
                    placeholder='Type your first name'
                    val={mainDataForm.firstName}
                    onChange={(newValue: string) => {
                      handleChangeInput('setFirstName', 'firstName', newValue);
                    }}
                  />
                ) : (
                  <p className='italic'>{account?.firstName}</p>
                )}
                <h4 className='text-h4 text-accentColor dark:text-basicColor'>Last Name:</h4>
                {editMainData ? (
                  <Input
                    {...nameValidation}
                    label=''
                    isColumn={true}
                    isSubmitted={isSubmitted}
                    placeholder='Type your second name'
                    val={mainDataForm.lastName}
                    onChange={(newValue: string) => {
                      handleChangeInput('setLastName', 'lastName', newValue);
                    }}
                  />
                ) : (
                  <p className='italic'>{account?.lastName}</p>
                )}

                <h4 className='text-h4 text-accentColor dark:text-basicColor'>Date of birth:</h4>
                {editMainData ? (
                  <Input
                    {...dateValidation}
                    label=''
                    isColumn={true}
                    isSubmitted={isSubmitted}
                    val={mainDataForm.dateOfBirth}
                    onChange={(newValue: string) => {
                      handleChangeInput('setDateOfBirth', 'dateOfBirth', newValue);
                    }}
                  />
                ) : (
                  <p className='italic'>{account?.dateOfBirth}</p>
                )}

                <h4 className='text-h4 text-accentColor dark:text-basicColor'>E-mail:</h4>
                {editMainData ? (
                  <Input
                    {...emailValidation}
                    label=''
                    isColumn={true}
                    isSubmitted={isSubmitted}
                    val={mainDataForm.email}
                    onChange={(newValue: string) => {
                      handleChangeInput('changeEmail', 'email', newValue);
                    }}
                  />
                ) : (
                  <p className='italic'>{account?.email}</p>
                )}
              </div>
              <div></div>
            </div>
            <div className='mb-2'>
              <div className='border-b-2 border-accentColor dark:border-basicColor p-2 flex justify-between items-center mb-4'>
                <h3 className='text-h3 text-accentColor dark:text-basicColor font-bold'>My list of addresses</h3>
                <AdditionalButton notFixedWidth onClick={handleCreateNewAddress}>
                  Add new address
                </AdditionalButton>
              </div>
              <div className='flex flex-col justify-between items-center md:flex-row flex-wrap'>
                {account?.addresses.map((address: AddressCardI) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    account={account}
                    onDelete={() => handleDeleteAddress(address.id)}
                    onEdit={() => handleEditAddress(address)}
                  />
                ))}
              </div>
            </div>
            <EmptyButton onClick={handleEditPassword}>Change password</EmptyButton>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
