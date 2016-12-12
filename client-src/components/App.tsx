import { Component } from 'react';
import * as React from 'react';

import { UserEntry } from '../../models/UserEntry';
import { ServerState, UserList } from '../../models/ServerState';

interface AppState {
    users?: UserList;
}

export class App extends Component<React.Props<App>, AppState> {
    componentWillMount() {
        fetch('/state').then(resp => resp.json() as Promise<ServerState>).then(resp => {
            this.setState({
                users: resp.users,
            });
        });
    }

    render() {
        if (!this.state || !this.state.users) {
            return <div>Loading users...</div>;
        }
        return <div>
            <h1>Participating users:</h1>
            <ul>
                {Object.keys(this.state.users).map(username => <li>{username} registered {this.state.users[username].lastEntry}</li>)}
            </ul>
        </div>;
    }
}

