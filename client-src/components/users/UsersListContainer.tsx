import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { UsersListProps, ConnectedProps, ConnectedDispatch, UsersList } from './UsersList';
import { GlobalState } from '../../state/GlobalState';
import { fetchUsers } from '../../actions/users';

function mapStateToProps(state: GlobalState, props: UsersListProps): ConnectedProps {
    return {
        users: state.users ? state.users.list : null,
        usersProgress: state.users.progress,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): ConnectedDispatch {
    return bindActionCreators({
        fetchUsers,
    }, dispatch);
}

export const UsersListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList) as React.ComponentClass<UsersListProps>;
