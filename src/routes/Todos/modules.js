import moment from 'moment';

const initialState = {
  loading: true,
  loaded: false,
  error: false,
  addError: false,
  offset: 0,
  pageSize: 10,
  todos: [],
};

const TOGGLE_TODO = 'todo/manage/TOGGLE_TODO';

const SORT_TODO = 'todo/manage/SORT_TODO';

function sortTodo(sort_type) {
  return { type: SORT_TODO, sort_type };
}

function toggleTodo(id) {
  return { type: TOGGLE_TODO, id };
}

function toggleTodoReducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_TODO: {
      const { completed } = state;
      const { id } = action;

      if (id !== state.id) {
        return state;
      }

      return { ...state, completed: !completed };
    }
    default:
      return state;
  }
}

const LOAD_TODOS = 'todo/manage/LOAD_TODOS';
const LOAD_TODOS_SUCCESS = 'todo/manage/LOAD_TODOS_SUCCESS';
const LOAD_TODOS_FAIL = 'todo/manage/LOAD_TODOS_FAIL';

const ADD_TODO = 'todo/manage/ADD_TODO';
const DEL_TODO = 'todo/manage/DEL_TODO';

function load() {
  return { type: LOAD_TODOS };
}

function loadSuccess(todos) {
  return { type: LOAD_TODOS_SUCCESS, todos };
}

function loadFail(error) {
  return { type: LOAD_TODOS_FAIL, error };
}

function addTodo(todo) {
  return { type: ADD_TODO, id: Math.random(), todo };
}

function deleteTodo(id) {
  return { type: DEL_TODO, id };
}

function ManageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TODOS: {
      return {
        ...state, loading: true, addError: false, error: false,
      };
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = action;
      return {
        ...state, loading: false, todos, loaded: true,
      };
    }
    case LOAD_TODOS_FAIL: {
      return {
        ...state, error: true, loading: false,
      };
    }
    case ADD_TODO: {
      const { id, todo } = action;

      return {
        ...state,
        addError: false,
        todos: [
          {
            id, name: todo, completed: false, created: moment().format('DD-MM-YYYY'),
          },
          ...state.todos,
        ],
      };
    }
    case DEL_TODO: {
      const { id } = action;

      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      };
    }
    case TOGGLE_TODO: {
      const { todos } = state;
      return {
        ...state,
        todos: todos.map((todo) => toggleTodoReducer(todo, action)),
      };
    }

    case SORT_TODO: {
      const { sort_type } = action;
      return {
        ...state,
        todos: state.todos.sort((a, b) => {
          if (sort_type === 'asc') {
            return a.name < b.name;
          }
          return b.name < a.name;

        }),
      };
    }
    default:
      return state;
  }
}

export const actions = {
  addTodo,
  deleteTodo,
  load,
  loadSuccess,
  loadFail,
  toggleTodo,
  sortTodo,
};

export const actionTypes = {
  LOAD_TODOS,
};

export default ManageReducer;
