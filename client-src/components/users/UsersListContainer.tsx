import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { UsersListProps, ConnectedProps, UsersList } from './UsersList';
import { GlobalState } from '../../state/GlobalState';

function mapStateToProps(state: GlobalState, props: UsersListProps): ConnectedProps {
    return {
        users: state.users ? state.users.list : null,
    };
}

export const UsersListContainer = connect(mapStateToProps)(UsersList) as React.ComponentClass<UsersListProps>;
