import { UserEntry } from './UserEntry';
import { GameList } from './GameList';

export type UserList = { [username: string]: UserEntry };
export type GameListList = { [username: string]: GameList }; 

export interface ServerState {
    users: UserList;
    lists: GameListList;
}
