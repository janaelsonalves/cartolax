import { REQUEST_TODOS, HANDLE_ERROR, RECEIVE_TODOS } from "../actionTypes";

const initialState = {
  todos: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TODOS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_TODOS:
      return {
        ...state,
        loading: false,
        todos: [...state.todos, action.todos]
      };
    case HANDLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
