import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing-container">
      <h1>Welcome to Personal Finance Tracker</h1>
      <p>Manage your finances easily and securely.</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;