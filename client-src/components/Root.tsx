import * as React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { store } from '../globals';
import { App } from './App';
import { UserDetailContainer } from './users/UserDetailContainer';

import { rescore } from '../actions/lists';

export class Root extends React.Component<void, void> {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path='/' component={App}>
                        <Route path='/user/:username' component={UserDetailContainer} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

window['gbtopten'] = {
    rescore() {
        store.dispatch(rescore());
    },
};
