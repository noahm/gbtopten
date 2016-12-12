import { UsersState } from './UsersState';

export interface GlobalState {
    users: UsersState;
}

export interface GlobalStateGetter {
    (): GlobalState;
}
