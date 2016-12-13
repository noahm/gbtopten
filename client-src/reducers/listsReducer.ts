import { ListsState } from '../state/ListsState';
import { FetchProgress } from '../../models/FetchProgress';
import { FetchListSucceeded, FETCH_LIST_SUCCEEDED } from '../actions/lists';

type Actions = FetchListSucceeded;

const initialState: ListsState = {
    lists: {},
};

export function listsReducer(state: ListsState = initialState, action: Actions) {
    switch (action.type) {
        case FETCH_LIST_SUCCEEDED:
            state.lists[action.list.author] = action.list;
            state = {
                lists: state.lists,
            };
            break;
    }

    return state;
}
