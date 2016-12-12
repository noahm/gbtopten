import { GameList } from './GameList';

export type PostList = ListErrorResp | ListSuccesResp;

interface ListErrorResp {
    status: "error";
    reason: "not-a-list" | "parse-failed";
}

interface ListSuccesResp {
    status: "ok";
    list: GameList;
}
