export type AppResponse<T, R = string> = { data: T | null; error?: R };

export type AppActionResponse<R = string> = { success: boolean; error?: R };
