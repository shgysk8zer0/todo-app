export default class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.append(this.template);
  }

  clear() {
    this.list.clear();
  }

  get list() {
    return this.querySelector('todo-list');
  }

  get items() {
    return this.list.items;
  }

  add(...args) {
    return this.list.add(...args);
  }

  get template() {
    return document.getElementById('todo-app-template').content.cloneNode(true);
  }
}
