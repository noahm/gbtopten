import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { UsersListProps, ConnectedProps, ConnectedDispatch, UsersList } from './UsersList';
import { GlobalState } from '../../state/GlobalState';
import { fetchUsers } from '../../actions/users';
import { fetchTargetList } from '../../actions/lists';

function mapStateToProps(state: GlobalState, props: UsersListProps): ConnectedProps {
    return {
        users: state.users ? state.users.list : null,
        usersProgress: state.users.progress,
        showScores: !!state.lists.targetList,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): ConnectedDispatch {
    return bindActionCreators({
        fetchUsers,
        fetchTargetList,
    }, dispatch);
}

export const UsersListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList) as React.ComponentClass<UsersListProps>;
