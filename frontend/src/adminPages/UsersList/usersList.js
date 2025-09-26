import { useState, useEffect } from "react";
import axios from "axios";

import { format } from "date-fns"; // Date format
// Toast Notifications
import { toast } from "react-toastify";

import { MdDeleteOutline } from "react-icons/md"; //Delete Icon

import AdminNavbar from "../AdminNavbar";

const API_URL = `${process.env.API_URL}/api/auth`;
const ADMIN_HEADERS = { headers: { "x-user-role": "admin" } };

const UsersList = () => {
  const [usersDetails, setUsersDetails] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsersDetails();
  }, []);

  // Format the date to "MMM dd yyyy Aug 24 2025"
  const formatDate = (date) => {
    if (!date) return "N/A";
    return format(new Date(date), "MMM dd yyyy - hh:mm a");
  };

  // Fetch User Details
  const fetchUsersDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, ADMIN_HEADERS);
      setUsersDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`${API_URL}/${id}`, ADMIN_HEADERS);
      toast.success("User deleted successfully!");
      fetchUsersDetails();
    } catch {
      toast.error("Failed to delete user!");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="user-reservations-details-card">
        <h2 className="section-header-title">Users Details</h2>
        {/* Add your reservation details here */}
        <ul className="reservation-list">
          {usersDetails.length === 0 ? (
            <li className="no-reservation">No Users found.</li>
          ) : (
            <>
              {usersDetails.map((user) => (
                <li key={user.id} className="reservation-item">
                  <p>
                    <strong>UserID:</strong> {user._id}
                  </p>
                  <p>
                    <strong>Name:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Date of Registration:</strong>{" "}
                    {formatDate(user.registrationDate)}
                  </p>

                  <div className="reservation-actions-btns">
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDelete(user._id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default UsersList;
