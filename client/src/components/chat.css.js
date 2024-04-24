import {css} from 'lit';

export default css`
.container {
  position: relative;
  height: 100vh;
  background-color: #e5e7eb;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.message-list {
  flex-shrink: 1;
  overflow-y: auto;
}
`;
