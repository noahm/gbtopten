import { ListsState } from '../state/ListsState';
import {
    FetchListSucceeded, FETCH_LIST_SUCCEEDED,
    TargetListUpdated, TARGET_LIST_UPDATED,
} from '../actions/lists';

type Actions = FetchListSucceeded | TargetListUpdated;

const initialState: ListsState = {
    lists: {},
    targetList: null,
};

export function listsReducer(state: ListsState = initialState, action: Actions) {
    switch (action.type) {
        case FETCH_LIST_SUCCEEDED:
            state.lists[action.list.author] = action.list;
            state = {
                lists: state.lists,
                targetList: state.targetList,
            };
            break;
        case TARGET_LIST_UPDATED:
            state = {
                lists: state.lists,
                targetList: action.list,
            };
            break;
    }

    return state;
}
