import React from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "../actions";
import { StoreState } from "../reducers";
import "../app.css";
interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}
class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { fetching: false };
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }
  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  };

  onDeleteClick = (id: number): void => {
    this.props.deleteTodo(id);
  };
  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div key={todo.id}>
          <div className="todo-wrapper">
            <div>{todo.title}</div>
            <button onClick={() => this.onDeleteClick(todo.id)}>DELETE</button>
          </div>
          <hr />
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        <div>{this.state.fetching ? "LOADING" : null}</div>

        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState): { todos: Todo[] } => {
  return { todos: state.todos };
};

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
