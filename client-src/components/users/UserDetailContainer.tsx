import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { UserDetailProps, ConnectedProps, ConnectedDispatch, UserDetail } from './UserDetail';
import { GlobalState } from '../../state/GlobalState';
import { fetchList } from '../../actions/lists';

function mapStateToProps(state: GlobalState, props: UserDetailProps): ConnectedProps {
    return {
        user: state.users.list ? state.users.list[props.params.username] : null,
        list: state.lists.lists ? state.lists.lists[props.params.username] : null,
        showScores: !!state.lists.targetList,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: UserDetailProps): ConnectedDispatch {
    return bindActionCreators({
        fetchList,
    }, dispatch);
}

export const UserDetailContainer = connect(mapStateToProps, mapDispatchToProps)(UserDetail);
