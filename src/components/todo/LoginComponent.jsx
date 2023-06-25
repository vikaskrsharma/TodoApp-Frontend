import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

function LoginComponent() {

    const authContext = useAuth();

    const [username, setUsername] = useState("vikas");
    const [password, setPassword] = useState("dummy");

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleLoginClick() {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`);
        } else {
            setShowErrorMessage(true);
            navigate('/login');
        }
    }

    return (
        <div className="Login">
            <h1>Login Page</h1>
            {showErrorMessage && <div className='ErrorMessage'>Authenticated Failed</div>}
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleLoginClick}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;