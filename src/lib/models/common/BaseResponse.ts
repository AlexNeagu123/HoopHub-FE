interface BaseResponse {
    success: boolean;
    message: string;
    validationErrors: { [key: string]: string };
}

export type { BaseResponse }