import { LitElement, html } from "lit";
import style from './message-element.css.js';
import { BOT_USERNAME } from '../constants.js';

export class MessageElement extends LitElement {
  static get properties() {
    return {
      message: { type: String },
      user: { type: String },
      author: { type: String }
    }
  }

  constructor() {
    super();
  }

  static styles = [style];

  getUserAvatar() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>`;
  }

  getBotAvatar() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor"><path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/></svg>`;
  }

  render() {
    const { message, author, user, getBotAvatar, getUserAvatar } = this;
    const isBot = author === BOT_USERNAME;
    return html`
      <div class="message ${author === user ? 'mine' : ''}">
        <div class="avatar ${ isBot ? 'bot' : '' }">
          ${ isBot ? getBotAvatar() : getUserAvatar() }
        </div>
        <div class="message-body">
          <span class="author">
            ${author}
          </span>
          <span>
            ${message}
          </span>
        </div>
      </div>
    `
  }
}

window.customElements.define('message-element', MessageElement);