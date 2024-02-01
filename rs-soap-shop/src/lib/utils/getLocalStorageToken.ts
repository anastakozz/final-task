import { introspectToken, refreshToken, setAnonymousToken } from '../../services/registration.service';
import { tokenNames } from '../enums';
const { userToken, anonymous } = tokenNames;

async function setRefreshedToken(storageKey: string) {
  try {
    const refresh = localStorage.getItem(`${storageKey}Refresh`);
    const newToken = await refreshToken(refresh);
    const dataToSet = JSON.stringify(newToken.data);
    localStorage.setItem(`${storageKey}`, dataToSet);
    return newToken.data.access_token;
  } catch (err) {
    console.log(err);
  }
}

export async function getTokenFromStorage(isWithoutCheck = false) {
  const isLoggedIn = !!localStorage.getItem(`${userToken}`);
  const isSeenBefore = !!localStorage.getItem(`${anonymous}`);
  if (!isLoggedIn && !isSeenBefore) {
    await setAnonymousToken();
  }

  const token = isLoggedIn
    ? JSON.parse(localStorage.getItem(`${userToken}`)).access_token
    : JSON.parse(localStorage.getItem(`${anonymous}`)).access_token;

  const check = isWithoutCheck ? true : await introspectToken(token);

  if (check) {
    return token;
  } else if (isLoggedIn) {
    return await setRefreshedToken(`${userToken}`);
  } else {
    return await setRefreshedToken(`${anonymous}`);
  }
}
