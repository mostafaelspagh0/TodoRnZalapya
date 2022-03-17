interface Todo {
    id: TodoId;
    title: string;
    done: boolean;
  }
  
  type TodoId = number;
  
  interface TodoState {
    todos: Todo[];
    lastId: TodoId;
  }