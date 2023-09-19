import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";


function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/users/signUp', {
      method: 'POST',
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 201) {
        navigate('/login');
      } else {
        alert('Register fail!');
      }
    })
  };

  return (
    <div className={'container'}>
      <h1>Register</h1>
      <p>
        <Link to={'/login'}>Login</Link>
      </p>
      <form onSubmit={handleSubmit} className="bg-light p-4">
        <div className="form-group">
          <label className={'form-label'}>First Name</label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Enter first name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>

        <div className="form-group">
          <label className={'form-label'}>Last Name</label>
          <input
            required
            type="text"
            className="form-control"
            placeholder="Enter last name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>

        <div className="form-group">
          <label className={'form-label'}>Email address</label>
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
          <label className={'form-label'}>Password</label>
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

export default Register;