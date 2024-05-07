import type {BaseResponse} from "$lib/models/common/BaseResponse";

interface Response<T> extends BaseResponse {
    data: T;
}

interface PagedResponse<T> extends BaseResponse {
    data: T;
    page: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
}

export type {Response, PagedResponse}