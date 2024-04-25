import { LitElement, html } from "lit";
import style from './messages-list-element.css.js';
import './message-element.js';

export class MessagesListElement extends LitElement {
  static get properties() {
    return {
      messages: { type: Array },
      user: { type: String }
    }
  }

  constructor() {
    super();
    this.messages = [];
  }

  static styles = [style];

  render() {
    const { messages, user } = this;
    return html`
      <div class="messages">
        ${messages.map(m => {
          return html`
            <message-element
              class="${m.user === user ? 'mine' : ''}"
              message="${m.message}" 
              user="${m.user}" 
              currentuser="${user}"></message-element>
          `;
        })}
      </div>
    `
  }
}

window.customElements.define('messages-list-element', MessagesListElement);