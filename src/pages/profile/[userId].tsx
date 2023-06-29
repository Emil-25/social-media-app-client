import Profile from '@/components/profile/profile';
import { ProtectedRoute } from '@/components/protectedRoute';
import { useRouter } from 'next/router';

function ProfilePage() {
  const router = useRouter();
  const userId: any = router.query.userId;

  return <>{userId && <Profile userId={userId} />}</>;
}

export default ProtectedRoute(ProfilePage);
