import {css} from 'lit';

export default css`
.messages {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  overflow-y: auto;
}

.message {
  margin-top: 1rem;
  max-width: 20rem;
  display: flex;
}

.message span {
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 0.5rem;
  border-bottom-left-radius: 0;
  background-color: #d1d5db;
  color: #4b5563;
  display-inline: inline-block
}

.message.mine {
  align-self: flex-end;
}

.message.mine span {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0.5rem;
  background-color: #2563eb;
  color: #eeeeee;
}
`;