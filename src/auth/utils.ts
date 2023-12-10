// routes
import { User } from 'src/interfaces/User';
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();
  const date = new Date(exp * 1000);
  if (date.getTime() - currentTime < 0) {
    alert('Token expired');

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    window.location.href = PATH_AUTH.login;
  }
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string | null, user?: string) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
    if (user) {
      localStorage.setItem('user', user);
    }
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    delete axios.defaults.headers.common.Authorization;
  }
};

export function getSession(): User | undefined {
  if (!localStorage.getItem('accessToken')) return undefined;
  const user = localStorage.getItem('user');
  if (!user) return undefined;

  return JSON.parse(user) as User;
}
