import { proxy } from 'valtio';

const token = localStorage.getItem('token');

interface AuthState {
  isAuthenticated: boolean;
}

interface UserState {
  name: string;
  email: string;
}

interface AppState {
  auth: AuthState;
  user: UserState;
}

export const store = proxy<AppState>({
  auth: {
    isAuthenticated: false,
  },
  user: {
    name: '',
    email: '',
  },
});
