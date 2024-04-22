import {LitElement, html} from 'lit';
import style from './chat.css.js';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

/**
 * An example element.
 */
export class ChatElement extends LitElement {
  static get properties() {
    return {
      messages: { type: Array },
      value: { type: String }
    };
  }

  constructor() {
    super();
    this.messages = [];
    this.value = '';
    this.socket = io('http://localhost:3000', {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*"
    }});
    this.socket.on('new connection', console.log);
    this.socket.on('newMessage', (message) => this.updateMessageList(message))
  }

  static styles = [style];

  handleOnChange(e) {
    this.value = e.target.value;
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.socket.emit('message', this.value);
    this.value = '';
  }

  updateMessageList(message) {
    console.log(message);
    this.messages = [...this.messages, message];
  }

  render() {
    const { value, messages } = this;
    return html`
      <div class="container">
        <div class="messages">
          ${messages.map(m => {
            return html`
              <div class="message">
                <span>
                  ${m}
                </span>
              </div>
            `;
          })}
        </div>
        <div class="form-container">
          <form class="form" @submit="${this.handleOnSubmit}">
            <input type="text" class="input" placeholder="Write your message!" .value=${value} @input=${this.handleOnChange} />
            <button class="button">
              <span>Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    `;
  }
}

window.customElements.define('chat-element', ChatElement);
