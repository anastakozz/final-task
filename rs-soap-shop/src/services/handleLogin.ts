import { getToken, login, relogin } from './login.service';
import { tokenNames } from '../lib/enums';
const { userToken, userTokenRefresh } = tokenNames;

export async function handleLogin(email: string, password: string) {
  try {
    const resp = await getToken(email, password);

    const authData = resp.data;
    localStorage.setItem(`${userToken}`, JSON.stringify(authData));
    localStorage.setItem(`${userTokenRefresh}`, authData.refresh_token);
    login(email, password)
      .then(response => {
        const userData = response?.data;
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
        }
      })
      .catch(e => console.log(e));
  } catch (err) {
    console.error(err);
  }
}

export async function handleRelogin(email: string, password: string) {
  try {
    const resp = await getToken(email, password);
    const authData = resp.data;
    localStorage.setItem(`${userToken}`, JSON.stringify(authData));
    localStorage.setItem(`${userTokenRefresh}`, authData.refresh_token);
    relogin(email, password).then(response => {
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
    });
  } catch (err) {
    console.error(err);
  }
}
