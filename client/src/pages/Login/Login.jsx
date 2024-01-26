import { useState } from "react";
import axios from "../../api/axios";

const LOGIN_URL = '/api/signin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Keep track of the login errors
    const [success, setSuccess] = useState(false);

    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(LOGIN_URL,
              {
              email: email,
              password: password
          },
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
          );
          console.log(response.data);
          //console.log(response.accessToken);
          console.log(JSON.stringify(response))
          setEmail('');
          setPassword('');


      } catch (err) {
          
          if (!err?.response) {
            setError('No Server Response. Please try again later.');
          } else if (err.response?.status === 409) {
            setError("email or password invalid. Please try again.");
          }else {
            setError("Something went wrong. Please try again later.");
          }
      }
        
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