import { ListsState } from '../state/ListsState';
import {
    FetchListSucceeded, FETCH_LIST_SUCCEEDED,
    TargetListUpdated, TARGET_LIST_UPDATED,
    SubmitListSuccess, SUBMIT_LIST_SUCCESS,
} from '../actions/lists';

type Actions = FetchListSucceeded | TargetListUpdated | SubmitListSuccess;

const initialState: ListsState = {
    lists: {},
    targetList: null,
};

export function listsReducer(state: ListsState = initialState, action: Actions) {
    switch (action.type) {
        case FETCH_LIST_SUCCEEDED:
        case SUBMIT_LIST_SUCCESS:
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
