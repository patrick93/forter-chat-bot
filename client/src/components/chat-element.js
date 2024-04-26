import {LitElement, html} from 'lit';
import style from './chat-element.css.js';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { faker } from '@faker-js/faker';

import './messages-list-element.js';
import './message-input-element.js';

export class ChatElement extends LitElement {
  static get properties() {
    return {
      user: { type: String },
      messages: { type: Array }
    };
  }

  constructor() {
    super();
    this.messages = [];
    this.user = faker.internet.userName();
    this.socket = io('http://localhost:3000', {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*"
    }});
    this.socket.on('newMessage', (message) => this.updateMessageList(message))
  }

  static styles = [style];

  handleOnSubmit(e) {
    this.socket.emit('message', { user: this.user, message: e.detail.message });
  }

  updateMessageList(message) {
    this.messages = [...this.messages, message];
    setTimeout(() => {
      const messageListElement = this.shadowRoot.getElementById("message-list");
      messageListElement.scrollTop = messageListElement.scrollHeight;
    });
  }

  render() {
    const { messages, user } = this;
    return html`
      <div class="container">
        <messages-list-element id="message-list" class="message-list" messages="${JSON.stringify(messages)}" user="${user}"></messages-list-element>
        <message-input-element class="message-input" @onSubmit="${this.handleOnSubmit}"></message-input-element>
      </div>
    `;
  }
}

window.customElements.define('chat-element', ChatElement);
