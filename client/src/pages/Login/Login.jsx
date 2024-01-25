import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Implement the logic to authenticate the user here (e.g., sending a POST request to your server)
    
        // Clear the form fields
        setEmail('');
        setPassword('');
      };

      return (
        <div className="login">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={handleEmailChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={handlePasswordChange} required />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      );
};
export default Login;