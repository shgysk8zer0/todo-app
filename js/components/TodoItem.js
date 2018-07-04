import {$} from '../std-js/functions.js';

export default class TodoItem extends HTMLElement {
  constructor() {
    super();
    const tmp = this.template;
    $('[data-action="remove"]', tmp).click(() => this.remove());
    $('[data-action="done"]', tmp).click(() => {
      this.classList.toggle('item-done');
    })
    this.append(tmp);
  }

  set label(label) {
    $('[data-field="label"]', this).text(label);
  }

  get label() {
    return this.querySelector(['data-field="label"']).textContent;
  }

  set due(date) {
    $('[data-field="due"]', this).text(due);
    $('[data-field="title"]', this).attr({datetime: due});
  }

  get due() {
    const due = this.querySelector('[data-field="due"][datetime]');
    return new Date(due.datetime);
  }

  get template() {
    return document.getElementById('todo-item-template').content.cloneNode(true);
  }
}
