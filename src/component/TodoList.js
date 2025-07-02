import React, {Component} from "react";
import Todo from "./Todo";
import {fetchTodos} from "../actions";
import {connect} from "react-redux";

class TodoList extends Component {
  state = {
    newTodo: ""
  };


  // When the component mounts, fetch existing todos from the store
  componentDidMount() {
    this.props.fetchTodos();
  }

  // Update local state as user types into the input field
  handleChange = (e) => {
    this.setState({newTodo: e.target.value});
  }
  // Handle form submission to add a new todo
    handleSubmit = (e) => {
      e.preventDefault();
      const { newTodo } = this.state;
      if (newTodo.trim()) {
        // Dispatch the addTodo action
        this.props.addTodo({ task: newTodo.trim() });
        this.setState({ newTodo: "" }); // Clear input after adding
      }
    };

  render() {
    const {todos} = this.props.data;
    return (<ul className="todo-list">
      {todos && todos.length
        ? todos.map((todo, index) => {
          return <Todo key={`todo-${index}`} todo={todo.task}/>;
        })
        : "No todos, yay!"}
    </ul>);
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