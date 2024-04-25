import {css} from 'lit';

export default css`
.messages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 1.5rem;
}

.messages .mine {
  align-self: flex-end;
}
`;