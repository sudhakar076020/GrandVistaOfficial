import React, { useEffect, useState} from 'react'
import axios from 'axios'
import './Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'; // SweetAlert2 for login alert message 

const Login = ()=> {
    const [loginFormData, setLoginFormData]= useState({
        email: "",
        password: ""
    });

    // If JWT token is exists in localStorage, skip the login page
    useEffect(()=> {
        const token = localStorage.getItem('token');
        if(token){
            navigate('./dashboard');
        }
    });



    const [showPassword, setShowPassword] = useState(false); //Input password show password

    const navigate = useNavigate(); //Navigate to another page

    // Get a input values
    const inputChangeValue = event => {
        setLoginFormData({...loginFormData, [event.target.name]: event.target.value})
    }

    // Submit the form
    const submitLoginForm = async (event)=> {
        event.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/api/auth/login', loginFormData)
            localStorage.setItem("token", res.data.token) //Store the JWT token in localstorage keyname:token
            console.log(res.data)
            // Login alert message by sweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Welcome back!',
                text: 'Login successful',
                timer: 1500,
                showConfirmButton: false
            });
            navigate('/dashboard');  //Redirect to dashboard
        }catch(error){
             // Login error alert message by sweetAlert2
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: (error.response?.data?.message || error.message)
            });
            console.log(error)
        }
    }

    return(
        <div className='form-container'>
            <div className='form-card'>
                <h2>Login</h2>
                <form onSubmit={submitLoginForm}>
                    <input className='form-input' type="email" name="email" placeholder='Email' onChange={inputChangeValue} />
                    <div className='password-input-wrapper'>
                        <input type={showPassword? 'text': 'password'} name="password" placeholder='Password' onChange={inputChangeValue} autoComplete="new-password"/> {/*autoComplete="new-password" is don't Save Password in Chrome*/} 
                        <span onClick={()=> setShowPassword(!showPassword)} className='toggle-password-icon'>
                            {showPassword ?  <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}
                        </span>
                    </div>
                    <br/>
                    <button className='submit-btn' type="submit">Login</button>
                </form>
                <p className='form-word'>Don't have an account? 
                    <Link to="/Register">Register</Link>
                </p>
                <div className='social-media-card'>
                    <button type='button'>
                        <i className="fa-brands fa-facebook-f"></i>
                    </button>
                     <button type='button'>
                        <i className="fa-brands fa-google"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}



export default Login;