import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {format} from "date-fns" // Formate the Date
import axios from 'axios'
import './Dashboard.css'
import Swal from 'sweetalert2'; // SweetAlert2 for logout alert message 
import Cookies from 'js-cookie';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser]= useState(null); 
    const [loginTime, setLoginTime] = useState("");



  // SweetAlert2 The logout alert message popup
const handleLogout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "logout-confirm-btn",
        cancelButton: "logout-cancel-btn"
      },
      buttonsStyling: false
    });

  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You will be logged out!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, logout!",
    cancelButtonText: "No, stay here",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      Cookies.remove('token');
      swalWithBootstrapButtons.fire({
        title: "Logged out!",
        text: "You have been successfully logged out.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/login');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "You are still logged in :)",
        icon: "info",
        timer: 1200,
        showConfirmButton: false
      });
    }
  });
};


  useEffect(()=> {
      const fetchUser = async()=> {
        try{
          const token = Cookies.get('token');
          const res = await axios.get('http://localhost:5000/api/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUser(res.data);
          // Logged in - formatted Time
          const formatLoginTime = format(new Date(), 'EEEE, MMMM do yyyy, h:mm:ss a');
          setLoginTime(formatLoginTime); // Set Login Time
        }
        catch(error){
          console.log('Failed to fetch user', error);
          navigate('/login')
        }
      }
      fetchUser();
    }, [navigate])


  return (
    <div className='dashboard-container'>
      <div className='dashboard-card'>
        <h1>Welcome to Dashboard</h1>
          <div className='profile-card'>
           <i className="fa-solid fa-user"></i>
            {user && <p className='user-name'>Hi, <span> {user.username}</span></p>}
        </div>
        {user && <p>Logged in as: {user.email}</p>}
        <p>Login time: {loginTime}</p>
        <button type='button' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard
