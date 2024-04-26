import {LitElement, html} from 'lit';
import style from './chat-element.css.js';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { faker } from '@faker-js/faker';
import { config } from '../config';
import { SOCKET_CHANNELS } from '../constants.js';

import './messages-list-element.js';
import './message-input-element.js';

function getSocket() {
  return io(config.SOCKER_URL, {
    extraHeaders: {
      "Access-Control-Allow-Origin": "*"
    }
  });
}

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
    this.socket = getSocket();
    this.socket.on(SOCKET_CHANNELS.NEW_MESSAGE, (message) => this.updateMessageList(message))
  }

  static styles = [style];

  handleOnSubmit(e) {
    this.socket.emit(SOCKET_CHANNELS.MESSAGE, { user: this.user, message: e.detail.message });
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
