import { UsersState } from '../state/UsersState';
import { FetchProgress } from '../../models/FetchProgress';
import {
    FetchUsersStarted, FetchUsersSucceeded, FetchUsersFailed,
    FETCH_USERS_STARTED, FETCH_USERS_SUCCEEDED, FETCH_USERS_FAILED,
} from '../actions/users';
import {
    FetchListSucceeded, FETCH_LIST_SUCCEEDED,
    SubmitListSuccess, SUBMIT_LIST_SUCCESS,
} from '../actions/lists';

type Actions = FetchUsersStarted | FetchUsersSucceeded | FetchUsersFailed | FetchListSucceeded | SubmitListSuccess;

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
        case FETCH_LIST_SUCCEEDED:
        case SUBMIT_LIST_SUCCESS:
            if (!state.list) {
                state.list = {};
            }
            state.list[action.list.author] = {
                username: action.list.author,
                lastEntry: Date.now(),
                listScore: action.list.score ? action.list.score.totalScore : 0,
            };
            state = {
                list: state.list,
                progress: state.progress,
            };
            break;
    }

    return state;
}
