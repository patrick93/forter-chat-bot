import {css} from 'lit';

export default css`
.form-container {
  margin-bottom: 0;
  padding: 1rem 1rem 0 1rem;
}

.form {
  display: flex;
}

.input {
  width: 100%;
  border-radius: 0.375rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.75rem;
  padding-right: 0;
  color: #4b5563;
  background-color: #e5e7eb;
  border: 1px solid #d1d5db;
}

.input:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 0.75rem 1rem 0.75rem 1rem;
  color: #eeeeee;
  background-color: #3b82f6;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #60a5fa;
}

.button:focus {
  outline: none;
}

.button span {
  font-weight: 700;
}

.button svg {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  transform: rotate(90deg);
}
`;
