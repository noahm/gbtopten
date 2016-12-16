import { Dispatch } from 'redux';

import { GlobalStateGetter } from "../state/GlobalState";
import { GameList } from '../../models/GameList';
import { GetList } from '../../models/responses';

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
