import { GET_ALL_USER,CREATE_USER,UPDATE_USER ,DELETE_USER} from "./user.actions.constants"


const initialState = {
  getAllUser: [],
  createUser: [],
  updateUser: [],
  deleteUser:[]
   
  };
  
  export default function userListReducer(state =  initialState, action) {
    switch (action.type) {
      case GET_ALL_USER:
        {
          return {
            ...state,
            getAllUser: action.payload,
          };
        }
        case CREATE_USER:
        {
          return {
            ...state,
            createUser: action.payload,
          };
        }
        case UPDATE_USER:
          {
            return {
              ...state,
              updateUser: action.payload,
            };
        }
        case DELETE_USER:
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
  