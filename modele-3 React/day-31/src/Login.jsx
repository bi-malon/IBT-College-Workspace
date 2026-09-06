import { useNavigate, useLocation } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/checkout";

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>Sign In Required</h2>
      <button onClick={handleLogin}>Click here to Sign In</button>
    </div>
  );
}
