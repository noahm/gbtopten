import { Component } from 'react';
import * as React from 'react';

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
                <p>A friendly little competition: Predict Giant Bomb's top 10 games of 2016 better and win the admiration of your peers!</p>
                {this.props.children}
            </div>
        </div>;
    }
}
