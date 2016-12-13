import * as React from 'react';
import { Link } from 'react-router';

import { FetchProgress } from '../../../models/FetchProgress';
import { UserDict } from '../../../models/ServerState';

export interface UsersListProps extends React.Props<UsersList> {}

export interface ConnectedProps {
    users: UserDict;
}

export interface ConnectedDispatch {

}

type CombinedTypes = UsersListProps & ConnectedProps & ConnectedDispatch;

export class UsersList extends React.Component<CombinedTypes, void> {
    render() {
        const usernames = Object.keys(this.props.users);
        return <div>
            <h1>Participating users:</h1>
            <ul>
                {usernames.map(username => <li key={username}>
                    <Link to={`/${encodeURI(username)}`}>{username}</Link> scored {this.props.users[username].listScore}
                </li>)}
            </ul>
        </div>;
    }
}
