import * as React from 'react';
import { browserHistory } from 'react-router';

import { PostList } from '../../../models/responses';

export interface SubmitFormProps extends React.Props<SubmitForm> {}

export interface ConnectedProps {
    entryAvailable: boolean;
}

export interface ConnectedDispatch {
    submitList(list: string): Promise<PostList>;
}

type CombinedTypes = SubmitFormProps & ConnectedProps & ConnectedDispatch;

interface SubmitFormState {
    expanded?: boolean;
}

export class SubmitForm extends React.Component<CombinedTypes, SubmitFormState> {
    constructor(props: CombinedTypes) {
        super(props);
        this.state = {};
    }

    private input: HTMLInputElement;
    render() {
        if (!this.props.entryAvailable) {
            return null;
        }

        let contents: JSX.Element;
        if (this.state.expanded) {
            contents = <form id="SubmitForm" onSubmit={this.onSubmitList}>
                <label>
                    OK, where's your list?<br />
                    <input
                        autoFocus
                        required
                        type="url"
                        title="Submit a link to your top 10 prediction list on giantbomb.com"
                        placeholder="http://www.giantbomb.com/profile/cathadan/lists/maybe-the-best-of-2009/357929/"
                        name="listUrl"
                        ref={e => this.input = e}
                    />
                </label>
                <button>I'm in!</button>
            </form>;
        } else {
            contents = <a href="#" onClick={this.expand}>Wanna join the fun?</a>;
        }
        return <div id="SubmitForm">
            {contents}
        </div>;
    }

    private expand = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        this.setState({
            expanded: true,
        });
    }

    private onSubmitList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.submitList(this.input.value).then(data => {
            if (data.status === 'ok') {
                browserHistory.push('/user/' + encodeURI(data.list.author));
            }
        });
    };
}
