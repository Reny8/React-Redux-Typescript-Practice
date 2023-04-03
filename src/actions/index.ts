import axios from "axios";
import { Dispatch } from "redux";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Todo[]>(
      "https://jsonplaceholder.typicode.com/todos"
    );
    dispatch({
      type: "FETCH_TODOS",
      payload: response.data,
    });
  };
};
