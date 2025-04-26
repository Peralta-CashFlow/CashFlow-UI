import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof AxiosError && error.response?.data?.message) {
        errorMessage = error.response?.data?.message;
    }
    return errorMessage;
}