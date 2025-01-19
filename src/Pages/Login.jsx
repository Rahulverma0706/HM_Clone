import { useContext, useState } from 'react';
import '../Styles/Login.css';
import { AuthContext } from '../Context/ContextProvider';


const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const{isLogin, setIsLogin} = useContext(AuthContext)

    function handleSubmit(e) {
        e.preventDefault();
        if (email == 'admin@mail.com' && pass == 'admin@1234jkl') {
            setIsLogin(true)
            console.log(isLogin);
        } else {
            alert('You are logged in!');
        }
    }

    return (
        <div id='Loginbox'>
            
            <h1>Log in</h1>
            <br /><br />
            <h2>Become a member — don’t miss out on deals, offers, discounts and bonus vouchers.</h2>

            <br /><br /><br />

            {/* <p>admin@mail.com</p>
            <p>hint: admin@1234jkl</p> */}
            <br></br>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <br />
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password</label>
                <br />
                <input type="password" onChange={(e) => setPass(e.target.value)} />
                <br />
                <button type='submit'>Submit</button>
            </form>
            <br /><br /><br /><br />
           <a href="/"><h2>H&M Membership</h2></a> 
        </div>
    );
};

export default Login;
