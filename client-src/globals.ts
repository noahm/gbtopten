import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import thunk from 'redux-thunk';

// import { Config } from './models/Config';
import { GlobalState } from './state/GlobalState';
import { usersReducer } from './reducers/usersReducer';
import { listsReducer } from './reducers/listsReducer';

export let store: Store<GlobalState>;
// export let config: Config;

export function initGlobals() {
    // config = new Config();
    store = createStore(
        combineReducers<GlobalState>({
            users: usersReducer,
            lists: listsReducer,
        }),
        applyMiddleware(thunk)
    );
}
