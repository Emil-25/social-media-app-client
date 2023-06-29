import LogIn from '@/components/auth/login';
import { LoggedRoute } from '@/components/protectedRoute';

function Login() {
  return <LogIn />;
}

export default LoggedRoute(Login);
