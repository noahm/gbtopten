import * as React from 'react';

import { GameList } from '../../../models/GameList';
import { PostList } from '../../../models/responses';

export interface SubmitFormProps extends React.Props<SubmitForm> {}

export interface ConnectedProps {
}

export interface ConnectedDispatch {
    fetchListSucceeded(list: GameList): void;
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
        fetch('/api/list', {
            method: 'POST',
            body: this.input.value,
        }).then(resp => {
            return resp.json() as Promise<PostList>;
        }).then(data => {
            if (!data || data.status === "error") {
                console.error();
            } else {
                this.props.fetchListSucceeded(data.list);
            }
        });
    };
}
