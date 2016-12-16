import * as React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { store } from '../globals';
import { App } from './App';
import { UserDetailContainer } from './users/UserDetailContainer';

import { PutRescore } from '../../models/responses';
import { targetListUpdated } from '../actions/lists';
import { fetchUsers } from '../actions/users';

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
        fetch('/api/rescore', { method: 'PUT' }).then(r => r.json() as Promise<PutRescore>).then(data => {
            if (data.status === "ok") {
                console.log(data.status);
            } else {
                console.warn(data.reason);
            }
        });
    },
};
