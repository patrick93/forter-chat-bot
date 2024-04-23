import { LitElement, html } from "lit";
import style from './messages-list-element.css.js';

export class MessagesListElement extends LitElement {
  static get properties() {
    return {
      messages: { type: Array },
    }
  }

  constructor() {
    super();
    this.messages = [];
  }

  static styles = [style];

  render() {
    const { messages } = this;
    return html`
      <div class="messages">
        ${messages.map(m => {
          return html`
            <div class="message ${Math.floor(Math.random() * 2) ? 'mine' : ''}">
              <span>
                ${m}
              </span>
            </div>
          `;
        })}
      </div>
    `
  }
}

window.customElements.define('messages-list-element', MessagesListElement);