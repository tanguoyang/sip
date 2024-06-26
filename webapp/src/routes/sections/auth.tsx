import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { GuestGuard } from 'src/auth/guard';
// layouts
import CompactLayout from 'src/layouts/compact';
import AuthClassicLayout from 'src/layouts/auth/classic';
// components
import { SplashScreen } from 'src/components/loading-screen';
import AuthModernLayout from 'src/layouts/auth/modern';
import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));

// FIREBASE
const FirebaseLoginPage = lazy(() => import('src/pages/auth/firebase/login'));
const FirebaseRegisterPage = lazy(() => import('src/pages/auth/firebase/register'));
const FirebaseVerifyPage = lazy(() => import('src/pages/auth/firebase/verify'));
const FirebaseForgotPasswordPage = lazy(() => import('src/pages/auth/firebase/forgot-password'));

// ----------------------------------------------------------------------

const authJwt = {
  path: 'jwt',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <JwtLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Manage the job more effectively with Minimal">
          <JwtRegisterPage />
        </AuthClassicLayout>
      ),
    },
  ],
};

const authFirebase = {
  path: 'firebase',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthModernLayout>
          <FirebaseLoginPage />
        </AuthModernLayout>
      ),
    },
    // {
    //   path: 'register',
    //   element: (
    //     <AuthClassicLayout title="Manage the job more effectively with Minimal">
    //       <FirebaseRegisterPage />
    //     </AuthClassicLayout>
    //   ),
    // },
    // {
    //   element: (
    //     <CompactLayout>
    //       <Outlet />
    //     </CompactLayout>
    //   ),
    //   children: [
    //     { path: 'verify', element: <FirebaseVerifyPage /> },
    //     { path: 'forgot-password', element: <FirebaseForgotPasswordPage /> },
    //   ],
    // },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authFirebase, authJwt],
  },
];
