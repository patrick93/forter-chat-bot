import { LitElement, html } from "lit";
import style from './messages-list-element.css.js';

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
            <div class="message ${user === m.user ? 'mine' : ''}">
              <span class="author">
                ${m.user}
              </span>
              <span>
                ${m.message}
              </span>
            </div>
          `;
        })}
      </div>
    `
  }
}

window.customElements.define('messages-list-element', MessagesListElement);