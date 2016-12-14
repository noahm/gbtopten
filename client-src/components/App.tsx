import { Component } from 'react';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions/users';
import { GlobalState } from '../state/GlobalState';

import { UserEntry } from '../../models/UserEntry';
import { ServerState, UserDict } from '../../models/ServerState';
import { FetchProgress } from '../../models/FetchProgress';
import { UsersListContainer } from './users/UsersListContainer';

interface AppProps {
    params: {
        username?: string;
        other_username?: string;
    };
}

export class App extends Component<AppProps, void> {
    render() {
        return <div id="App">
            <UsersListContainer selectedUser={this.props.params.username} comparedUser={this.props.params.other_username} />
            <div id="contents">
                {this.props.children}
            </div>
        </div>;
    }
}
