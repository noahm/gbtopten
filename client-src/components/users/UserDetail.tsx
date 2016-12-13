import * as React from 'react';

import { FetchProgress } from '../../../models/FetchProgress';
import { GameList } from '../../../models/GameList';
import { UserEntry } from '../../../models/UserEntry';

export interface UserDetailProps extends React.Props<UserDetail> {
    params: { username: string };
}

export interface ConnectedProps {
    list: GameList;
    user: UserEntry;
}

export interface ConnectedDispatch {
    fetchList(username: string): Promise<any>;
}

type CombinedTypes = UserDetailProps & ConnectedProps & ConnectedDispatch;

export class UserDetail extends React.Component<CombinedTypes, void> {
    componentWillMount() {
        if (!this.props.list) {
            this.props.fetchList(this.props.params.username);
        }
    }

    render() {
        return <div>
            <h1>Entry by {this.props.params.username}</h1>
        </div>;
    }
}
