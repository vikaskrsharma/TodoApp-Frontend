import { useEffect, useState } from "react";
import { deleteTodosByIdAndUsernameApi, retrieveTodosForUsername } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 3, today.getMonth(), today.getDay());

    const authContext = useAuth();
    const username = authContext.username;

    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);

    // const todos = [
    //     { id: 1, description: 'Learn Spring', done: false, targetDate: targetDate },
    //     { id: 2, description: 'Learn React', done: false, targetDate: targetDate },
    //     { id: 3, description: 'Learn DSA', done: false, targetDate: targetDate }
    // ];

    useEffect(() => refreshTodos(), []);

    function refreshTodos() {
        retrieveTodosForUsername(username)
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finally cleanup'));
    }

    function deleteTodoByIdAndUsername(id) {
        deleteTodosByIdAndUsernameApi(username, id)
            .then((response) => {
                setMessage(`Todo with id ${id} Deleted Successfully`);
                refreshTodos();
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finally cleanup'));
    }

    function updateTodoByIdAndUsername(id) {
        console.log('clicked ' + id);
        navigate(`/todos/${id}`);
    }

    function addNewTodo() {
        navigate(`/todos/-1`);
    }

    return (
        <div className='container'>
            <h1>Things to do</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Description</th>
                            <th>isDone</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate}</td>
                                        <td><button className="btn btn-warning" onClick={() =>
                                            deleteTodoByIdAndUsername(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() =>
                                            updateTodoByIdAndUsername(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}

export default ListTodosComponent;