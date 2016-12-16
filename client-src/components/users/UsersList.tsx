import * as React from 'react';
import { Link } from 'react-router';

import { FetchProgress } from '../../../models/FetchProgress';
import { UserDict } from '../../../models/ServerState';

import { SubmitFormContainer } from '../lists/SubmitFormContainer';

export interface UsersListProps extends React.Props<UsersList> {
    selectedUser?: string;
    comparedUser?: string;
}

export interface ConnectedProps {
    users: UserDict;
    usersProgress: FetchProgress;
}

export interface ConnectedDispatch {
    fetchUsers: () => void;
}

type CombinedTypes = UsersListProps & ConnectedProps & ConnectedDispatch;

export class UsersList extends React.Component<CombinedTypes, void> {
    componentWillMount() {
        if (this.props.usersProgress === FetchProgress.Pending) {
            this.props.fetchUsers();
        }
    }

    render() {
        let placeholder: string;
        switch (this.props.usersProgress) {
            case FetchProgress.Errored:
                placeholder = 'Failed to fetch user list';
                break;
            case FetchProgress.Done:
                break;
            case FetchProgress.Pending:
            case FetchProgress.InFlight:
            default:
                placeholder = 'Loading users...';
                break;
        }

        if (placeholder) {
            return <div id="UsersList">{placeholder}</div>;
        }
        const usernames = Object.keys(this.props.users);
        return <div id="UsersList">
            <SubmitFormContainer />
            <h1>Participating users:</h1>
            <ul>
                {usernames.map(username => {
                    const classname = username === this.props.selectedUser ? 'selected' : '';
                    return <Link key={username} to={`/user/${encodeURI(username)}`}><li className={classname}>
                        {username}
                    </li></Link>;
                })}
            </ul>
        </div>;
    }
}
