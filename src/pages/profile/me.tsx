import Profile from '@/components/profile/profile';
import { ProtectedRoute } from '@/components/protectedRoute';
import { UserContext } from '@/context/userContext';
import { useContext, useEffect } from 'react';

function Me() {
  const [user, setUser] = useContext(UserContext);

  return <div>{user.id && <Profile userId={user.id!} />}</div>;
}

export default ProtectedRoute(Me);
