import {css} from 'lit';

export default css`
.messages {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
}

.message {
  margin-top: 1rem;
  max-width: 20rem;
  display: flex;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 0.5rem;
  border-bottom-left-radius: 0;
  background-color: #d1d5db;
  color: #4b5563;
  display: flex;
  flex-direction: column;
}

.message span.author {
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.75rem
}

.message.mine {
  align-self: flex-end;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0.5rem;
  background-color: #2563eb;
  color: #eeeeee;
}

span {
  word-break: break-all;
}
`;