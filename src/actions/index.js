import axios from "axios";
import { FETCH_TODOS, ADD_TODO} from "./types";

export function fetchTodos() {
  return function(dispatch) {
    return axios.get("http://localhost:9091/api/todo").then(({ data }) => {
      dispatch(setTodos(data));
    });
  };
}

function setTodos(data) {
  return {
    type: FETCH_TODOS,
    payload: data,
  };
}
  // addTodo action to post a new todo to server and update store
export function addTodo(todo) {
  return function(dispatch) {
    return axios
      .post("http://localhost:9091/api/todo", todo)
      .then(({ data }) => {
        dispatch(setTodos(data.todos));
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };
}
