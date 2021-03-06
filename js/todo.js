/** @jsx React.DOM */

var React = require('react');
var TodoInput = require('./todo-input.jsx');
var TodoList = require('./todo-list.jsx');

/**
 * Todo module
 * A simple todo component.
**/

var Todo = React.createClass({displayName: "Todo",
	getInitialState: function() {
    return {
      todos: this.props.todos,
      todoText: 'What needs to be done?'
    };
  },
  addTodo: function(text) {
    this.setState({
      todoText: text
    });
    var newTodos = this.state.todos.slice();    
    newTodos.push({id: this.state.todos.length + 1, completed: false, title: text});
    this.setState({
      todos: newTodos
    });
  },
  /* 
   * Toggle the complete state for the todo by id.
   * @param {number} id - Id of the todo to update
  */
  toggleComplete: function(id) {
    var newTodos = this.state.todos.map(function(todo) {
      return {
        id: todo.id,
        completed: (todo.id === id ? !todo.completed : todo.completed),
        title: todo.title
      };
    });        
    this.setState({
      todos: newTodos
    });
  },
  changeTodo: function (value) {
    console.log(value);
    this.state.todoText = value;
  },
  /** 
   * Set all todos to complete or incomplete based on the input value.
   * @param {boolean} value - The value to toggle, complete = true
  **/
  toggleAllComplete: function(value) {
    var newTodos = this.state.todos.map(function(todo) {
      return { 
      	id: todo.id, 
      	completed: value, 
      	title: todo.title };
    });
    this.setState({
      todos: newTodos
    });
  },
	render: function() {
		return (
			React.createElement("div", {className: "react-todo"}, 
			
				React.createElement(TodoInput, {
				  todoText: this.state.todoText, 
				  onaddTodo: this.addTodo, 
          onChangeTodo: this.changeTodo}), 

				React.createElement(TodoList, {
				  todos: this.state.todos, 
				  onToggleComplete: this.toggleComplete, 
				  onToggleAllComplete: this.toggleAllComplete}
				)
			)
		)
	}
});

module.exports = Todo;