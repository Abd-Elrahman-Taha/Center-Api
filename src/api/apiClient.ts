const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface RequestOptions extends RequestInit {
    timeout?: number;
}

//Custom api Error class to handle API errors
export class ApiError extends Error {
    status: number;
    data: unknown;

    constructor(status:number, data:unknown , message:string) {
        super(message);

        this.name = "ApiError";
        this.status = status;
        this.data = data;

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

//Parse Api response and throw error if response is not ok
async function parseResponse(response: Response) {
    if(response.status === 204) {
        return null;
    }

    const contentType = response.headers.get("Content-Type");
    if(contentType && contentType.includes("application/json")) {
        return response.json();
    }
    return response.text();
}

//Centralized API client to handle all API requests
async function request<T>(endpoint:string , config:RequestOptions = {}): Promise<T> {
    const { timeout = 15000, signal, headers, ...fetchOptions } = config;
    const controller = new AbortController();
    const timeoutId =setTimeout(()=> controller.abort(), timeout);

    const isFormData = fetchOptions.body instanceof FormData;
    const token = localStorage.getItem("token");
    const requestHeaders = new Headers(headers);

    if(!isFormData && !requestHeaders.has("Content-Type")) {
        requestHeaders.set("Content-Type", "application/json");
    }
    if(token && !requestHeaders.has("Authorization")) {
        requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    //Fetching data from API
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`,{
         ...fetchOptions, 
         headers: requestHeaders,
         signal: signal ?? controller.signal}); 
        const data = await parseResponse(response);
        if(!response.ok) {
          const errorMessage = typeof data ==="object" && 
          data !== null && "message" in data ? 
          String(data.message) : response.statusText || "Something went wrong";
          throw new ApiError(response.status, data, errorMessage);
        }
        return data as T;
    }
        catch (error) {
        if (error instanceof ApiError) {
        throw error;
        }

        if (error instanceof Error && error.name === "AbortError") {
        throw new Error(
            "Request was cancelled or timed out"
        );
        }

        throw new Error(
        error instanceof Error
            ? error.message
            : "Network error occurred"
        );
    }   finally {
        clearTimeout(timeoutId);
    }
}

//HTTP Methods for API requests
export const apiClient = {
    get: <T>(endpoint: string, config?: RequestOptions) => request<T>(endpoint, { ...config, method: "GET" }),
    post: <T>(endpoint: string, config?: RequestOptions ,body?: unknown) => request<T>(endpoint, { ...config, method: "POST", body : body !== undefined ? JSON.stringify(body) : undefined }),
    put: <T>(endpoint: string, config?: RequestOptions ,body?: unknown) => request<T>(endpoint, { ...config, method: "PUT", body : body !== undefined ? JSON.stringify(body) : undefined }),
    patch: <T>(endpoint: string, config?: RequestOptions ,body?: unknown) => request<T>(endpoint, { ...config, method: "PATCH", body : body !== undefined ? JSON.stringify(body) : undefined }),
    delete: <T>(endpoint: string, config?: RequestOptions ,body?: unknown) => request<T>(endpoint, { ...config, method: "DELETE", body : body !== undefined ? JSON.stringify(body) : undefined })
};