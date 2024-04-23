import { LitElement, html } from "lit";
import style from './message-input.css.js';

export class MessagesInputElement extends LitElement {
  static get properties() {
    return {
      value: { type: String },
    }
  }

  constructor() {
    super();
    this.value = '';
  }

  static styles = [style];

  handleOnChange(e) {
    this.value = e.target.value;
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('onSubmit', {
      detail: { message: this.value },
      bubbles: false,
      composed: true
    }))
    this.value = '';
  }

  render() {
    const { value, handleOnSubmit, handleOnChange } = this;
    return html`
      <div class="form-container">
        <form class="form" @submit="${handleOnSubmit}">
          <input type="text"
                class="input"
                placeholder="Write your message!"
                .value=${value} 
                @input=${handleOnChange} />
          <button class="button">
            <span>Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </form>
      </div>
    `
  }
}

window.customElements.define('message-input-element', MessagesInputElement);