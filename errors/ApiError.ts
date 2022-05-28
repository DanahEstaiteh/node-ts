class ApiError {
    constructor(public code: number, public message:string) {
        this.code = code;
        this.message = message;
    }

    static badRequest(message: string) {
        return new ApiError(400, message)
    }

    static serverError(message : string) {
        return new ApiError(500, message)
    }
    static duplicate(message : string) {
        return new ApiError(409, message)
    }
}

export { ApiError }