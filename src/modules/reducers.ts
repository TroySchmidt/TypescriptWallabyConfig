import { LoginState } from './login';
import { MappingState } from './mapping';

export interface AppState {
  currentUser: LoginState;
  mapping: MappingState;
}
