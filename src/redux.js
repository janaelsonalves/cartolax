const { createStore, applyMiddleware } = require("redux");
const Axios = require("axios").default;
const Thunk = require("redux-thunk").default;
const Logger = require("redux-logger").createLogger();

const ADD_TASK = "ADD_TASK";

const REQUEST_TODOS = "REQUEST_TODOS";
const RECEIVE_TODOS = "RECEIVE_TODOS";
const HANDLE_ERROR = "HANDLE_ERROR";

const addTask = task => ({ type: ADD_TASK, task });

const apiUri = "https://jsonplaceholder.typicode.com/todos";

const requestTodos = () => ({ type: REQUEST_TODOS });
const handleError = () => ({ type: HANDLE_ERROR });
const receiveTodos = todos => ({ type: RECEIVE_TODOS, todos });

const getTodos = () => dispatch => {
  dispatch(requestTodos());
  Axios.get(apiUri)
    .then(res => dispatch(receiveTodos(res.data)))
    .catch(err => console.log(err));
};

const getTodo = id => dispatch => {
  dispatch(requestTodos());
  Axios.get(`${apiUri}/${id}`)
    .then(res => dispatch(receiveTodos(res.data)))
    .catch(err => dispatch(handleError(err)));
};

let initialState = {
  todos: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return Object.assign({}, state, {
        todos: [...state.todos, action.task]
      });
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

const store = createStore(reducer, applyMiddleware(Thunk, Logger));

let task1 = {
  id: 1,
  title: "Task 1"
};

let task2 = {
  id: 2,
  title: "Task 2"
};

store.subscribe(() => {
  const { loading, todos } = store.getState();
  loading
    ? console.log("Loading data!")
    : console.log(
        "Loading State: " +
          JSON.stringify(loading) +
          "\nTodos: " +
          JSON.stringify(todos)
      );
});

// store.dispatch(addTask(task1));
// store.dispatch(addTask(task2));
// store.dispatch(getTodos());
store.dispatch(getTodo(1));
