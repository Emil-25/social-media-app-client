import { ProtectedRoute } from '@/components/protectedRoute';
import Settings from '@/components/settings/settings';

function SettingsPages() {
  return <Settings />;
}

export default ProtectedRoute(SettingsPages);
