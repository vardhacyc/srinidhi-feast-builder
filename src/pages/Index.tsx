import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect main page to Diwali sweets page
  return <Navigate to="/diwali" replace />;
};

export default Index;
