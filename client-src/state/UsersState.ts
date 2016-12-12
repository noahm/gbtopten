import { UserDict } from '../../models/ServerState';
import { FetchProgress } from '../../models/FetchProgress';

export interface UsersState {
    list: UserDict;
    progress: FetchProgress;
}
