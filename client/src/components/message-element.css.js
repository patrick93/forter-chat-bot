import {css} from 'lit';

export default css`
.message {
  margin-top: 1rem;
  display: flex;
  align-items: end;
}

.message .avatar {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: #d1d5db;
  color: #4b5563;
}

.message.mine .avatar {
  display: none;
}

.message .avatar.bot {
  align-items: end;
  background-color: transparent;
  margin-bottom: 0.1rem;
}

.message .avatar svg {
  width: 20px;
}

.message .avatar.bot svg {
  width: 35px;
}

.message-body {
  max-width: 20rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 0.5rem;
  border-bottom-left-radius: 0;
  background-color: #d1d5db;
  color: #4b5563;
  display: flex;
  flex-direction: column;
}

.message-body span.author {
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.75rem
}

.mine .message-body {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0.5rem;
  background-color: #2563eb;
  color: #eeeeee;
}

.mine .message-body .author {
  display: none;
}

span {
  word-break: break-all;
}
`;