import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import VerifyOTP from '../pages/VerifyOTP';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';
import MainBoard from '../pages/MainBoard';
import ForgetPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';
// ...existing code...

// Public routes
export const publicRoutes = [
  {
    path: '/',
    component: Login,
    name: 'Root',
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
  },
  {
    path: '/signup',
    component: SignUp,
    name: 'SignUp',
  },
  {
    path: '/forgetPassword',
    component: ForgetPassword,
    name: 'ForgetPassword',
  },
  {
    path: '/resetPassword',
    component: ResetPassword,
    name: 'ResetPassword',
  },
  {
    path: '/verify-otp',
    component: VerifyOTP,
    name: 'VerifyOTP',
  },
];

// Admin routes
export const adminRoutes = [
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
  },
];

// User routes
export const userRoutes = [
  {
    path: '/home',
    component: HomePage,
    name: 'Home',
  },
  {
    path: '/board',
    component: MainBoard,
    name: 'Board',
  },
];
