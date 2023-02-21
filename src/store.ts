import { proxy } from 'valtio';

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
    isAuthenticated: true,
  },
  user: {
    name: '',
    email: '',
  },
});
