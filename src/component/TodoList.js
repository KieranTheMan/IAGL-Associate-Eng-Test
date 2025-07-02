import React, {Component} from "react";
import Todo from "./Todo";
import {fetchTodos} from "../actions";
import {connect} from "react-redux";

class TodoList extends Component {
  state = {
    newTodo: "",
  };

  // When the component mounts, fetch existing todos from the store
  componentDidMount() {
    this.props.fetchTodos();
  }

  // Update local state as user types into the input field
  handleChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };
  // Handle form submission to add a new todo
  handleSubmit = (e) => {
    e.preventDefault();
    const { newTodo } = this.state;
    if (newTodo.trim()) {
      // Dispatch the addTodo action
      this.props.addTodo({ task: newTodo.trim() });
      this.setState({ newTodo: "" });
    }
  };

  render() {
    const { todos } = this.props.data;

    return (
      <>
        {/* The Form to add a new todo to the list */}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="You can Add a new todo here"
            value={this.state.newTodo}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>

        {/* This is the List of Todo code */}
        <ul className="todo-list">
          {todos && todos.length > 0
            ? todos.map((todo, index) => (
                <Todo key={`todo-${index}`} todo={todo.task} />
              ))
            : "No todos, yay!"}
        </ul>
      </>
    );
  }
}

const mapStateToProps = ({data = {}, isLoadingData = false}) => ({
  data,
  isLoadingData
});
export default connect(
  mapStateToProps,
  {
    fetchTodos
  }
)(TodoList);