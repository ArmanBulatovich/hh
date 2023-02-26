import { proxy } from 'valtio';

const token = localStorage.getItem('token');

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
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
    token: null,
  },
  user: {
    name: '',
    email: '',
  },
});
