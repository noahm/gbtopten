import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GlobalState } from '../../state/GlobalState';
import { submitList } from '../../actions/lists';
import { SubmitForm, SubmitFormProps, ConnectedProps, ConnectedDispatch } from './SubmitForm';

function mapStateToProps(state: GlobalState, props: SubmitFormProps): ConnectedProps {
    return {
        entryAvailable: !state.lists.targetList,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: SubmitFormProps): ConnectedDispatch {
    return {
        submitList: (url: string) => dispatch(submitList(url)),
    };
}

export const SubmitFormContainer = connect(mapStateToProps, mapDispatchToProps)(SubmitForm);
