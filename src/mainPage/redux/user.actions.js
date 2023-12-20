import { GET_ALL_USER, CREATE_USER,UPDATE_USER, } from "./user.actions.constants";
import axios from "axios";

import Swal from "sweetalert2";

// Toast configuration using SweetAlert2 for notifications

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-left",
  iconColor: "white",
  background: "green",
  color: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
 
  timerProgressBar: true,
});


// Action to fetch all users

export const getAllUser = async (dispatch) => {
  try {
    const response = await axios.get("https://node-mysql-api-byn8.onrender.com/getall_user");
    const result = await response;
    dispatch({ type: GET_ALL_USER, payload: result });
  } catch (error) {
    console.log(error);
  }
};


// Action to create a user

export const createUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://node-mysql-api-byn8.onrender.com/create_user",
        data
      );
      const result = await response.data;
      dispatch({ type: CREATE_USER, payload: result });
      dispatch(getAllUser);  // Refresh the user list after creating a new user


       // Display success popup
      await Toast.fire({
        icon: "success",
        text: "User Information has been created sucessfully",
        background: "green",
        color: "white",
      });
    } catch (error) {

      // Display error notification for incorrect user details
      Toast.fire({
        icon: "error",
        title: "User Details are wrong Please Enter correct details",
        background: "red",
        color: "white",
      });
      console.log(error);
    }
  };
};


// Action to update a user

export const updateUser = (data,id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `https://node-mysql-api-byn8.onrender.com/update_user/${id}`,
        data
      );
      const result = await response.data;
      dispatch(getAllUser)
      dispatch({ type: UPDATE_USER, payload: result });
     
      // Display success notification for updating user information

      await Toast.fire({
        icon: "success",
        text: "User Information has been updated sucessfully",
        background: "green",
        color: "white",
        timer: 1500,   // Close the notification after 1500ms
      });
      // window.location.reload();  // Reload the window after updating user info
    } catch (error) {

     // Display error notification for incorrect user details

      Toast.fire({
        icon: "error",
        title: "User Details are wrong Please Enter correct details",
        background: "red",
        color: "white",
      });
      console.log(error);
    }
  };
};


// Action to delete a user

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            const deletUrl = `https://node-mysql-api-byn8.onrender.com/delete_user/${id}`
            axios
              .delete(deletUrl)
              .then((response) => {
                console.log("Response data:", response.data);
                dispatch(getAllUser);  // Refresh the user list after deleting a user
              })
              .catch((error) => {
                console.error("Error:", error);
              });

            Swal.fire(
              "Deleted!",
              "Your data has been deleted.",
              "success"
            );
          }
        });
      
    } catch (error) {
      // Display error notification for incorrect user details
      Toast.fire({
        icon: "error",
        title: "User Details are wrong Please Enter correct details",
        background: "red",
        color: "white",
      });
      console.log(error);
    }
  };
};

