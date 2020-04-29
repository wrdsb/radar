import { AxiosError, AxiosRequestConfig } from "axios";
import { User, UsersListResponse } from "./teamViewerTypes";
import { teamViewerAPI } from "./teamViewerAPI";
import { apiConfig } from "./apiConfig";
import { ServerError } from "./serverError";

export class teamViewerUserAPI {
    private apiConfig: AxiosRequestConfig;
    private api: teamViewerAPI;

    public constructor (apiToken: string ) {
        this.apiConfig = apiConfig;
        this.apiConfig.headers.common.Authorization = apiToken;
        this.api = new teamViewerAPI(this.apiConfig);
    }

    // GET /users
    public async list(): Promise<User[] | ServerError> {
        try {
            const response = await this.api.get<UsersListResponse>('/users?full_list=true');
            const data = response.data.users;
            return data;
        } catch (err) {
            if (err && err.response) {
                const axiosError = err as AxiosError<ServerError>
                return axiosError.response.data;
            }
            throw err;
        }
    }
    
    // GET /users/{id}
    public async get(id: string): Promise<User | ServerError> {
        try {
            const response = await this.api.get<User>(`/users/${id}`);
            const data = response.data;
            return data;
        } catch (err) {
            if (err && err.response) {
                const axiosError = err as AxiosError<ServerError>
                return axiosError.response.data;
            }
            throw err;
        }
    }
    
    // POST /users
    public async create(user: User): Promise<User | ServerError> {
        try {
            const response = await this.api.post(`/users`, JSON.stringify(user));
            const data = response.data;
            return data;
        } catch (err) {
            if (err && err.response) {
                const axiosError = err as AxiosError<ServerError>
                return axiosError.response.data;
            }
            throw err;
        }
    }
    
    // PUT /users/{id}
    public async update(user: User): Promise<User | ServerError> {
        try {
            const response = await this.api.patch(`/users/${user.id}`);
            const data = response.data;
            return data;
        } catch (err) {
            if (err && err.response) {
                const axiosError = err as AxiosError<ServerError>
                return axiosError.response.data;
            }
            throw err;
        }
    }
    
    // DELETE /users/{id}
    public async delete(id: string): Promise<boolean | ServerError> {
        try {
            const response = await this.api.delete(`/user/${id}`);
            return true;
        } catch (err) {
            if (err && err.response) {
                const axiosError = err as AxiosError<ServerError>
                return axiosError.response.data;
            }
            throw err;
        }
    }
}
