import {css} from 'lit';

export default css`
:host {
    display: block;
    border: solid 1px gray;
    padding: 16px;
    max-width: 800px;
}

.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
`;
