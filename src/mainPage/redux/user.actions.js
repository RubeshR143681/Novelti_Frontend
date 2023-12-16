import { GET_ALL_USER, CREATE_USER,UPDATE_USER, } from "./user.actions.constants";
import axios from "axios";

import Swal from "sweetalert2";

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

export const getAllUser = async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8081/getall_user");
    const result = await response;
    console.log("this is team getal==>", result);
    dispatch({ type: GET_ALL_USER, payload: result });
  } catch (error) {
    console.log("tickets error", error);
  }
};

export const createUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/create_user",
        data
      );
      const result = await response.data;
      dispatch({ type: CREATE_USER, payload: result });
      dispatch(getAllUser);

      await Toast.fire({
        icon: "success",
        text: "User Information has been created sucessfully",
        background: "green",
        color: "white",
      });
    } catch (error) {
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

export const updateUser = (data,id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/update_user/${id}`,
        data
      );
      const result = await response.data;
      dispatch({ type: UPDATE_USER, payload: result });
     
      await Toast.fire({
        icon: "success",
        text: "User Information has been updated sucessfully",
        background: "green",
        color: "white",
        timer: 1500,
      });
      window.location.reload();
    } catch (error) {
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
            const deletUrl = `http://localhost:8081/delete_user/${id}`
            axios
              .delete(deletUrl)
              .then((response) => {
                console.log("Response data:", response.data);
                dispatch(getAllUser);
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

