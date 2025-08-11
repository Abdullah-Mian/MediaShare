import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const withAuth = (WrappedComponent, options = {}) => {
  const { redirectTo = '/login', allowGuest = false } = options;
  
  return function AuthenticatedComponent(props) {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!allowGuest && !currentUser) {
        router.replace(redirectTo);
      }
    }, [currentUser, router]);

    // Show loading while checking auth
    if (!allowGuest && !currentUser) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p>Checking authentication...</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;