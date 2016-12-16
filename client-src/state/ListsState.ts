import { GameListDict } from '../../models/ServerState';
import { GameList } from '../../models/GameList';

export interface ListsState {
    lists: GameListDict;
    targetList: GameList;
}
