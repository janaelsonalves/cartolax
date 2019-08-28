import { REQUEST_TODOS, HANDLE_ERROR, RECEIVE_TODOS } from "../actionTypes";

export const apiUri = "https://jsonplaceholder.typicode.com/todos";

export const requestTodos = () => ({ type: REQUEST_TODOS });
export const handleError = () => ({ type: HANDLE_ERROR });
export const receiveTodos = todos => ({ type: RECEIVE_TODOS, todos });

export const getTodos = () => dispatch => {
  dispatch(requestTodos());
  Axios.get(apiUri)
    .then(res => dispatch(receiveTodos(res.data)))
    .catch(err => console.log(err));
};

export const getTodo = id => dispatch => {
  dispatch(requestTodos());
  Axios.get(`${apiUri}/${id}`)
    .then(res => dispatch(receiveTodos(res.data)))
    .catch(err => dispatch(handleError(err)));
};
