import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ authenticated, ...props }: any) {
  if (authenticated) {
    return <Route {...props} />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
