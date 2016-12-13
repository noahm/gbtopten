import { Dispatch } from 'redux';

import { GlobalStateGetter } from "../state/GlobalState";
import { UserDict } from '../../models/ServerState';

// Fetch Users Started
export type FETCH_USERS_STARTED = 'FETCH_USERS_STARTED';
export const FETCH_USERS_STARTED: FETCH_USERS_STARTED = 'FETCH_USERS_STARTED';
export type FetchUsersStarted = {
    type: FETCH_USERS_STARTED;
};

function fetchUsersStarted(): FetchUsersStarted {
    return { type: FETCH_USERS_STARTED };
}

// Fetch Users Succeeded
export type FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
export const FETCH_USERS_SUCCEEDED: FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
export type FetchUsersSucceeded = {
    type: FETCH_USERS_SUCCEEDED;
    users: UserDict,
};

function fetchUsersSucceeded(users: UserDict): FetchUsersSucceeded {
    return { type: FETCH_USERS_SUCCEEDED, users };
}

// Fetch Users Failed
export type FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';
export const FETCH_USERS_FAILED: FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';
export type FetchUsersFailed = {
    type: FETCH_USERS_FAILED;
};

function fetchUsersFailed(): FetchUsersFailed {
    return { type: FETCH_USERS_FAILED };
}

// Fetch Games Thunk
export function fetchUsers() {
    return (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
        dispatch(fetchUsersStarted());

        const request = fetch('/api/users');
        request.then(resp => resp.json() as Promise<UserDict>).then(response => {
            dispatch(fetchUsersSucceeded(response));
        }).catch(error => {
            console.log('Failed to fetch user data', error);
            dispatch(fetchUsersFailed());
        });
        return request;
    };
}
