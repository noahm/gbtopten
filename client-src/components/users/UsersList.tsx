import * as React from 'react';

import { FetchProgress } from '../../../models/FetchProgress';
import { UserDict } from '../../../models/ServerState';

export interface UsersListProps extends React.Props<UsersList> {}

export interface ConnectedProps {
    users: UserDict;
}

export interface ConnectedDispatch {

}

type CombinedTypes = UsersListProps & ConnectedProps;

export class UsersList extends React.Component<CombinedTypes, void> {
    render() {
        const usernames = Object.keys(this.props.users);
        return <div>
            <h1>Participating users:</h1>
            <ul>
                {usernames.map(username => <li key={username}>{username} scored {this.props.users[username].listScore}</li>)}
            </ul>
        </div>;
    }
}
