import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuthContext} from "../auth/Auth";


function Login() {
  const {login} = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/users/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json())
      .then(data => {
        login(data.token, data.user)
        const splits = window.location.href.split('=');
        if (Array.isArray(splits) && splits[1]) {
          navigate(splits[1]);
        } else {
          navigate('/');
        }
      }).catch(err => {
        alert('Login fail, please check your email and password!');
    })
  };

  return (
    <div className={'container'}>
      <h1>Login</h1>
      <p>
        <Link to={'/register'}>Register</Link>
      </p>
      <form className={'mt-5 bg-light p-4'} onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input
            required
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            required
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;