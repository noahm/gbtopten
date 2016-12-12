import { Component } from 'react';
import * as React from 'react';

import { UserEntry } from '../../models/UserEntry';
import { ServerState, UserDict } from '../../models/ServerState';
import { PostList } from '../../models/responses';

interface AppState {
    users?: UserDict;
    errorMsg?: string;
}

export class App extends Component<React.Props<App>, AppState> {
    constructor(props: React.Props<App>) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.refreshState();
    }

    private refreshState() {
        fetch('/state').then(resp => resp.json() as Promise<UserDict>).then(resp => {
            this.setState({
                users: resp,
            });
        });
    }

    private input: HTMLInputElement;
    render() {
        if (!this.state.users) {
            return <div>Loading users...</div>;
        }
        return <div>
            <form onSubmit={this.onSubmitList}>
                <label>
                    Your list: <input name="listUrl" ref={e => this.input = e} /> { this.state.errorMsg ? 'Error: ' + this.state.errorMsg : null }
                    <br />
                    <button>Submit</button>
                </label>
            </form>
            <h1>Participating users:</h1>
            <ul>
                {Object.keys(this.state.users).map(username => <li key={username}>{username} scored {this.state.users[username].listScore}</li>)}
            </ul>
        </div>;
    }

    private onSubmitList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('/list', {
            method: 'POST',
            body: this.input.value,
        }).then(resp => {
            if (!resp.ok) {
                console.error(resp);
                return;
            } else {
                return resp.json() as Promise<PostList>;
            }
        }).then(data => {
            if (data.status === "error") {
                this.setState({
                    errorMsg: data.reason,
                });
            } else {
                this.setState({
                    errorMsg: null,
                });
                this.refreshState();
            }
        });
    };
}

