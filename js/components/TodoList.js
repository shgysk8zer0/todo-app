import TodoItem from './TodoItem.js';
export default class TodoList extends HTMLElement
{
  constructor() {
    super();
  }

  add({label = 'No label', due = null} = {}) {
    const item = new TodoItem;
    this.append(item);
    item.label = label;
    if (due instanceof Date) {
      item.due = due;
    }
    return item;
  }

  clear() {
    this.items.forEach(item => item.remove());
  }

  get items() {
    return [...this.querySelectorAll('todo-item')];
  }
}
