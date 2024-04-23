import {LitElement, html} from 'lit';
import style from './chat.css.js';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

import './messages-list-element.js';
import './message-input.js';

export class ChatElement extends LitElement {
  static get properties() {
    return {
      messages: { type: Array }
    };
  }

  constructor() {
    super();
    this.messages = [];
    this.socket = io('http://localhost:3000', {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*"
    }});
    this.socket.on('new connection', console.log);
    this.socket.on('newMessage', (message) => this.updateMessageList(message))
  }

  static styles = [style];

  handleOnSubmit(e) {
    this.socket.emit('message', e.detail.message);
  }

  updateMessageList(message) {
    this.messages = [...this.messages, message];
  }

  render() {
    const { messages } = this;
    return html`
      <div class="container">
        <messages-list-element messages="${JSON.stringify(messages)}"></messages-list-element>
        <message-input-element @onSubmit="${this.handleOnSubmit}"></message-input-element>
      </div>
    `;
  }
}

window.customElements.define('chat-element', ChatElement);
