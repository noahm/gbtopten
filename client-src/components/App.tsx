import { Component } from 'react';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions/users';
import { GlobalState } from '../state/GlobalState';

import { UserEntry } from '../../models/UserEntry';
import { ServerState, UserDict } from '../../models/ServerState';
import { FetchProgress } from '../../models/FetchProgress';

function mapStateToProps(state: GlobalState): ConnectedProps {
    return {
        usersProgress: state.users.progress,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): ConnectedDispatch {
    return bindActionCreators({
        fetchUsers: () => dispatch(fetchUsers),
    }, dispatch);
}

interface ConnectedProps {
    usersProgress: FetchProgress;
}

interface ConnectedDispatch {
    fetchUsers: () => void;
}

type AppProps = ConnectedProps & ConnectedDispatch;

class AppClass extends Component<AppProps, void> {
    componentWillMount() {
        if (this.props.usersProgress === FetchProgress.Pending) {
            this.props.fetchUsers();
        }
    }

    render() {
        switch (this.props.usersProgress) {
            case FetchProgress.Errored:
                return <div>Failed to fetch user list</div>;
            case FetchProgress.Done:
                return <div>
                    {this.props.children}
                </div>;
            case FetchProgress.Pending:
            case FetchProgress.InFlight:
            default:
                return <div>Loading users...</div>;
        }
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppClass);
