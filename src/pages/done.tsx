// next
import Head from 'next/head';

import AuthGuard from 'src/auth/AuthGuard';

// layouts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import TaskListDoneSection from 'src/components/task-list/DoneTask';
import MainLayout from '../layouts/main';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  const { prefetch } = useRouter();

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Sprint Asia - Test App</title>
      </Head>
      <AuthGuard>
        <TaskListDoneSection />
      </AuthGuard>
    </>
  );
}
