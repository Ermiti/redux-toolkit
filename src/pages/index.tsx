import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { selectTodos, setTodos, toggleTodo } from '../../features/todos/todosSlice';
import { RootState } from '../../store';
import { items } from '@/api/file';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home1() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => selectTodos(state));
  const { loading, error, data } = useQuery(GET_TODOS);

  useEffect(() => {
    if (data) {
      dispatch(setTodos(data.todos));
    }
  }, [data, dispatch]);

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  if (loading) return <p>Loading...</p>;


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">To-Do List</h1>
      <ul>
        {data.map((todo: Todo) => (
          <li key={todo.id} className="flex items-center justify-between py-2">
            <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>
              {todo.title}
            </span>
            <button
              onClick={() => handleToggleTodo(todo.id)}
              className="ml-4 text-sm text-blue-500"
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
