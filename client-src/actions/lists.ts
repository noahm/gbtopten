import { Dispatch } from 'redux';

import { GlobalStateGetter } from "../state/GlobalState";
import { GameList } from '../../models/GameList';
import { GetList, PutRescore, PostList } from '../../models/responses';

// Fetch List Succeeded
export const FETCH_LIST_SUCCEEDED = 'FETCH_LIST_SUCCEEDED';
export type FetchListSucceeded = {
    type: typeof FETCH_LIST_SUCCEEDED;
    list: GameList,
};

export function fetchListSucceeded(list: GameList): FetchListSucceeded {
    return { type: FETCH_LIST_SUCCEEDED, list };
}

// Fetch List Thunk
export function fetchList(username: string) {
    return (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {

        const request = fetch(`/api/list/${encodeURI(username)}`);
        request.then(resp => resp.json() as Promise<GetList>).then(response => {
            if (response && response.status === "ok") {
                dispatch(fetchListSucceeded(response.list));
            } else {
                let msg = 'Failed to fetch list data' + (response && response.status === "error" ? response.reason : "no-response");
                throw new Error(msg);
            }
        });
        return request;
    };
}

export const TARGET_LIST_UPDATED = 'TARGET_LIST_UPDATED';
export type TargetListUpdated = {
    type: typeof TARGET_LIST_UPDATED,
    list: GameList,
};

export function targetListUpdated(list: GameList): TargetListUpdated {
    return { type: TARGET_LIST_UPDATED, list };
}

export function fetchTargetList() {
    return (dispatch: Dispatch<any>, getState: GlobalStateGetter) => {
        return fetch('/api/targetlist').then(r => r.json() as Promise<GetList>).then(response => {
            if (response && response.status === "ok") {
                dispatch(targetListUpdated(response.list));
            } else {
                const msg = 'Failed to fetch target list data' + (response && response.status === "error" ? response.reason : "no-response");
                throw new Error(msg);
            }
        });
    };
}

export function rescore() {
    return (dispatch: Dispatch<any>) => {
        return fetch('/api/rescore', { method: 'PUT' }).then(r => r.json() as Promise<PutRescore>).then(data => {
            if (data.status === "ok") {
                dispatch(targetListUpdated(data.targetList));
            } else {
                console.warn(data.reason);
            }
        });
    };
}

export const SUBMIT_LIST_SUCCESS = 'SUBMIT_LIST_SUCCESS';
export type SubmitListSuccess = {
    type: typeof SUBMIT_LIST_SUCCESS,
    list: GameList,
};

export function submitListSuccess(list: GameList): SubmitListSuccess {
    return { type: SUBMIT_LIST_SUCCESS, list };
}

export function submitList(url: string) {
    return (dispatch: Dispatch<any>) => {
        return fetch('/api/list', {
            method: 'POST',
            body: url,
        }).then(resp => {
            return resp.json() as Promise<PostList>;
        }).then(data => {
            if (!data) {
                console.error('submit list failed');
            } else if (data.status === "error") {
                console.error('submit list failure:', data.reason);
            } else {
                dispatch(submitListSuccess(data.list));
            }
            return data;
        });
    };
}

