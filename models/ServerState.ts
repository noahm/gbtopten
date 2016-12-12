import { UserEntry } from './UserEntry';
import { GameList } from './GameList';

export type UserDict = { [username: string]: UserEntry };
export type GameListDict = { [username: string]: GameList };

export interface ServerState {
    users: UserDict;
    lists: GameListDict;
    targetList: GameList;
}
