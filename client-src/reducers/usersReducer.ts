import { UsersState } from '../state/UsersState';
import { FetchProgress } from '../../models/FetchProgress';
import {
    FetchUsersStarted, FetchUsersSucceeded, FetchUsersFailed,
    FETCH_USERS_STARTED, FETCH_USERS_SUCCEEDED, FETCH_USERS_FAILED,
} from '../actions/users';

type Actions = FetchUsersStarted | FetchUsersSucceeded | FetchUsersFailed;

const initialState: UsersState = {
    list: null,
    progress: FetchProgress.Pending,
};

export function usersReducer(state: UsersState = initialState, action: Actions) {
    switch (action.type) {
        case FETCH_USERS_STARTED:
            state = {
                list: state.list,
                progress: FetchProgress.InFlight,
            };
            break;
        case FETCH_USERS_FAILED:
            state = {
                list: state.list,
                progress: FetchProgress.Errored,
            };
            break;
        case FETCH_USERS_SUCCEEDED:
            state = {
                list: action.users,
                progress: FetchProgress.Done,
            };
            break;
    }

    return state;
}
