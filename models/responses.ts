import { GameList } from './GameList';

export type PostList = PostListError | PostListSucces;

interface PostListError {
    status: "error";
    reason: "not-a-list" | "parse-failed" | "submissions-closed";
    extra?: string;
}

interface PostListSucces {
    status: "ok";
    list: GameList;
}

export type GetList = GetListError | GetListSuccess;

interface GetListError {
    status: "error";
    reason: "not-found";
}

interface GetListSuccess {
    status: "ok";
    list: GameList;
}

export type GetLists = { [username: string]: GetList };

export type PutRescore = PutRescoreError | PutRescoreSuccess;

interface PutRescoreError {
    status: "error";
    reason: "too-soon" | "parse-failed";
}

interface PutRescoreSuccess {
    status: "ok";
    targetList: GameList;
}
