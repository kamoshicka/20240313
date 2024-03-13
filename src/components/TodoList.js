// ToDoアイテムのリストを受け取り、それぞれのアイテムを表示

import React, { useEffect, useState } from 'react';
function TodoList() {
    // 1.Todoアイテムのリストを保持する状態
    // 2.新しいTodoアイテムを追加するための入力値を保持する状態
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // 新しいTodoアイテムをtodos状態に追加する関数
    const addTodo = () => {
        setTodos([...todos, { id:Date.now(), text: newTodo}]);
        // 入力フィールドをクリア
        setNewTodo('');
    };

    const deleteTodo = (id) => {
        // 指定されたidと一致しないすべてのTodoアイテムを新しい配列に保つ
        setTodos(todos.filter(todo => todo.id !== id));
    }
    // 日時を表示
    const [date, setDate] = useState([])
    useEffect(() => {
        // setIntervalで日付更新機能を追加
        const intervalId = setInterval(() => {
        const d = new Date();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const dayOfWeek = d.getDay();
        const dayName = ['日','月','火','水','木','金','土'];
        setDate(month + '月' + day + '日' + '['+ dayName[dayOfWeek] +']' + hours + '時' + minutes + '分');
    }, 1000);
    return () => clearInterval(intervalId);
},[])

    // 入力フィールドの値が変更されたときに呼ばれる関数
    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    return (
        <div>
            <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="リストを追加"
            />
            <button onClick={addTodo}>Add</button>

            <ul>
            <p>現在時刻{date}</p>
                {todos.map(todo => (
                    <div key={todo.id}>
                    <li>{todo.text}</li>
                    <button onClick={() => deleteTodo(todo.id)}>delete</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;