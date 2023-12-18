import { GET_ALL_USER,CREATE_USER,UPDATE_USER ,DELETE_USER} from "./user.actions.constants"

// Initial state with an empty array for allUsers

const initialState = {
  getAllUser: [],
  createUser: [],
  updateUser: [],
  deleteUser:[]
   
  };
  
  export default function userListReducer(state =  initialState, action) {
    switch (action.type) {
      case GET_ALL_USER:
            // Updates the state with the payload received from the action
        {
          return {
            ...state,
            getAllUser: action.payload,
          };
        }
      case CREATE_USER:
            // create the new user to the existing list of users

        {
          return {
            ...state,
            createUser: action.payload,
          };
        }
      case UPDATE_USER:
            // Updates the specific user in the list with the modified data

          {
            return {
              ...state,
              updateUser: action.payload,
            };
        }
      case DELETE_USER:
            // Removes the user with the specified ID from the list

          {
            return {
              ...state,
              deleteUser: action.payload,
            };
          }
       
      default:
        return state;
    }
  }
  