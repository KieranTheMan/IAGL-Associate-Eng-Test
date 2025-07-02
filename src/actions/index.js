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

export function addTodo(todo) {
  return async function(dispatch) {
    try {
      const { data } = await axios
        .post("http://localhost:9091/api/todo", todo);
      dispatch(setTodos(data.todos));
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
}
