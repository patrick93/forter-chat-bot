import {LitElement, html} from 'lit';
import style from './demo-element.css.js';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

/**
 * An example element.
 */
export class DemoElement extends LitElement {
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
      <form @submit="${this.handleOnSubmit}">
        <input type="text" .value=${value} @input=${this.handleOnChange} />
        <button>Send</button>
      </form>
      <ul>
        ${messages.map(m => html`<li>${m}</li>`)}
      </ul>
    `;
  }
}

window.customElements.define('demo-element', DemoElement);
