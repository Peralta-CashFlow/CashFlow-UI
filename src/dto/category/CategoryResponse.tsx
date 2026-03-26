import { TagResponse } from "../tag/TagResponse";

export interface CategoryResponse {
    id: number,
    name: string,
    color: string,
    icon: string,
    tags: TagResponse[]
}