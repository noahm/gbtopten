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
    showScores: boolean;
}

export interface ConnectedDispatch {
    fetchUsers: () => void;
    fetchTargetList: () => void;
}

type CombinedTypes = UsersListProps & ConnectedProps & ConnectedDispatch;

export class UsersList extends React.Component<CombinedTypes, void> {
    componentWillMount() {
        if (this.props.usersProgress === FetchProgress.Pending) {
            this.props.fetchUsers();
            this.props.fetchTargetList();
        }
    }

    private static styles = {
        score: {
            float: 'right',
            paddingLeft: '5px',
        },
    };

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
        if (this.props.showScores) {
            usernames.sort((a, b) => this.props.users[a].listScore - this.props.users[b].listScore);
        } else {
            usernames.sort((a, b) => this.props.users[a].lastEntry - this.props.users[b].lastEntry);
        }
        return <div id="UsersList">
            <SubmitFormContainer />
            <h1>Participating users:</h1>
            <ul>
                {usernames.map(username => {
                    const classname = username === this.props.selectedUser ? 'selected' : '';
                    return <Link key={username} to={`/user/${encodeURI(username)}`}><li className={classname}>
                        <span>{username}</span>
                        {this.props.showScores ? <span style={UsersList.styles.score}>{this.props.users[username].listScore}pts</span> : null}
                    </li></Link>;
                })}
            </ul>
        </div>;
    }
}
