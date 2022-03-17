interface Todo {
  id: TodoId;
  title: string;
  done: boolean;
}

type TodoId = number;
type TodoListId = number;

interface TodoList {
  todos: Todo[];
  lastId: TodoId;
  listId: TodoListId;
  listName: string;
}


interface todoLists{
  todoLists: TodoList[];
  lastListId: TodoListId;
}