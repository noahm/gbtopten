import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { UserDetailProps, ConnectedProps, ConnectedDispatch, UserDetail } from './UserDetail';
import { GlobalState } from '../../state/GlobalState';
import { fetchList } from '../../actions/lists';
import { fetchUsers } from '../../actions/users';

function mapStateToProps(state: GlobalState, props: UserDetailProps): ConnectedProps {
    return {
        user: state.users ? state.users.list[props.params.username] : null,
        list: state.lists ? state.lists.lists[props.params.username] : null,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): ConnectedDispatch {
    return bindActionCreators({
        fetchList: (username: string) => dispatch(fetchList(username)),
    }, dispatch);
}

export const UserDetailContainer = connect(mapStateToProps, mapDispatchToProps)(UserDetail) as React.ComponentClass<UserDetailProps>;
