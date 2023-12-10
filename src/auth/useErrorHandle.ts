import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { PATH_AUTH } from 'src/routes/paths';
import { useRouter } from 'next/router';
import { useDispatch } from 'src/redux/store';
import { useAuthContext } from './useAuthContext';

export default function useErrorHandle() {
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuthContext();

  const handleError = useCallback(
    (err: any) => {
      if (err.name === 'AbortError') return;
      if (err.code && err.code === 401) {
        logout();
        replace(PATH_AUTH.login);
        return;
      }
      enqueueSnackbar(err.message || 'Something went wrong', { variant: 'error' });
    },
    [enqueueSnackbar, replace, logout]
  );

  return { handleError };
}
