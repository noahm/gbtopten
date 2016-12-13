import { UsersState } from './UsersState';
import { ListsState } from './ListsState';

export interface GlobalState {
    users: UsersState;
    lists: ListsState;
}

export interface GlobalStateGetter {
    (): GlobalState;
}
