import * as React from 'react';

import { FetchProgress } from '../../../models/FetchProgress';
import { GameList } from '../../../models/GameList';
import { UserEntry } from '../../../models/UserEntry';

export interface UserDetailProps extends React.Props<UserDetail> {
    params: { username: string };
}

export interface ConnectedProps {
    list: GameList;
    user: UserEntry;
}

export interface ConnectedDispatch {
    fetchList(username: string): void;
}

type CombinedTypes = UserDetailProps & ConnectedProps & ConnectedDispatch;

export class UserDetail extends React.Component<CombinedTypes, void> {
    componentWillMount() {
        if (!this.props.list) {
            this.props.fetchList(this.props.params.username);
        }
    }

    render() {
        let list: JSX.Element;
        if (!this.props.list) {
            list = <p>Loading...</p>;
        } else {
            const score = this.props.list.score;
            const seenGames = new Set<string>();
            list = <ul>
                {this.props.list.games.map((game, i) => {
                    const seen = seenGames.has(game.url);
                    seenGames.add(game.url);
                    return <li key={i}>
                        {game.title} - {(!seen && score && score.games[game.url] && score.games[game.url].score) || 0}
                    </li>;
                })}
            </ul>;
        }
        return <div>
            <h1>Entry by {this.props.params.username}</h1>
            <h2>Total score: {this.props.user && this.props.user.listScore}</h2>
            {list}
        </div>;
    }
}
