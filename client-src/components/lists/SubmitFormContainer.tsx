import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { GlobalState } from '../../state/GlobalState';
import { fetchListSucceeded } from '../../actions/lists';
import { SubmitForm, SubmitFormProps, ConnectedProps, ConnectedDispatch } from './SubmitForm';

function mapStateToProps(state: GlobalState, props: SubmitFormProps): ConnectedProps {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<any>): ConnectedDispatch {
    return bindActionCreators({
        fetchListSucceeded,
    }, dispatch);
}

export const SubmitFormContainer = connect(mapStateToProps, mapDispatchToProps)(SubmitForm) as React.ComponentClass<SubmitFormProps>;
