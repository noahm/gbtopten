import * as React from 'react';

import { FetchProgress } from '../../../models/FetchProgress';
import { PostList } from '../../../models/responses';

export interface UsersListProps extends React.Props<SubmitForm> {}

export interface ConnectedProps {
}

export interface ConnectedDispatch {

}

type CombinedTypes = UsersListProps & ConnectedProps;

export class SubmitForm extends React.Component<CombinedTypes, void> {
    private input: HTMLInputElement;

    render() {
        return <form onSubmit={this.onSubmitList}>
            <label>
                Your list:
                <input name="listUrl" ref={e => this.input = e} />
            </label>
            <br />
            <button>Submit</button>
        </form>;
    }

    private onSubmitList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('/api/list', {
            method: 'POST',
            body: this.input.value,
        }).then(resp => {
            if (!resp.ok) {
                console.error(resp);
                return;
            } else {
                return resp.json() as Promise<PostList>;
            }
        }).then(data => {
            if (data.status === "error") {
                // this.setState({
                //     errorMsg: data.reason,
                // });
            } else {
                // this.setState({
                //     errorMsg: null,
                // });
            }
        });
    };
}
