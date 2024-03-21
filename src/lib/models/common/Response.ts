import type {BaseResponse} from "$lib/models/common/BaseResponse";

interface Response<T> extends BaseResponse {
    data: T;
}

export type {Response}