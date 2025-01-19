import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';  // Import the CSS file
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { AuthContext } from '../Context/ContextProvider'
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Login successful');
                
                localStorage.setItem('token', data.token); // Save token to localStorage
                navigate('/');
            } else {
                alert(data.error || 'Invalid credentials');
                navigate('/register')
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <>
        <Navbar/>
        <Header/>
        <div className="parent-login">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Login;
