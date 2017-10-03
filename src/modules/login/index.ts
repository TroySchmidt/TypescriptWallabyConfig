import * as importedActions from './actions';
export const actions = importedActions;

export { default as reducer } from './reducer';

import LoginContainer from './components/LoginContainer';
export default LoginContainer;

export { default as UserControl } from './components/UserControl';
export { LoginState } from './reducer';