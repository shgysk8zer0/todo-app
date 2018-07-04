import './std-js/deprefixer.js';
import './std-js/shims.js';
import {$, ready} from './std-js/functions.js';
import TodoApp from './components/TodoApp.js';
import TodoList from './components/TodoList.js';
import TodoItem from './components/TodoItem.js';
import TodoForm from './components/TodoForm.js';

customElements.define('todo-app', TodoApp);
customElements.define('todo-list', TodoList);
customElements.define('todo-item', TodoItem);
customElements.define('todo-form', TodoForm);
