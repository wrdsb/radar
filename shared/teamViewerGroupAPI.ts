import { AxiosError, AxiosRequestConfig } from "axios";
import { Group, GroupsListResponse, UserShare } from "./teamViewerTypes";
import { teamViewerAPI } from "./teamViewerAPI";
import { apiConfig } from "./apiConfig";
import { ServerError } from "./serverError";

export class teamViewerGroupAPI {
    private apiConfig: AxiosRequestConfig;
    private api: teamViewerAPI;

    public constructor (apiToken: string ) {
        this.apiConfig = apiConfig;
        this.apiConfig.headers.common.Authorization = apiToken;
        this.api = new teamViewerAPI(this.apiConfig);
    }

    // GET /groups
    public async list(): Promise<Group[] | ServerError> {
        try {
            const response = await this.api.get<GroupsListResponse>('/groups');
            const data = response.data.groups;
            return data;
        } catch (err) {
            if (err && err.response) {
                const axiosError = err as AxiosError<ServerError>
                return axiosError.response.data;
            }
            throw err;
        }
    }
    
    // GET /groups/{id}
    public async get(id: string): Promise<Group | ServerError> {
        try {
            const response = await this.api.get<Group>(`/groups/${id}`);
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
    
    // POST /groups
    public async create(group: Group): Promise<Group | ServerError> {
        try {
            const response = await this.api.post(`/groups`, JSON.stringify(group));
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
    
    // PUT /groups/{id}
    public async update(group: Group): Promise<Group | ServerError> {
        try {
            const response = await this.api.put(`/groups/${group.id}`, JSON.stringify(group));
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
    
    // DELETE /groups/{id}
    public async delete(id: string): Promise<boolean | ServerError> {
        try {
            const response = await this.api.delete(`/groups/${id}`);
            return true;
        } catch (err) {
            if (err && err.response) {
                const axiosError = err as AxiosError<ServerError>
                return axiosError.response.data;
            }
            throw err;
        }
    }

    // POST /groups/{id}/share_group
    public async share(id: string, shares: UserShare[]): Promise<boolean | ServerError> {
        let users = {
            users: shares
        };

        try {
            const response = await this.api.post(`/groups/${id}/share_group`, JSON.stringify(users));
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

    // POST /groups/{id}/unshare_group
    public async unshare(id: string, userIDs: string[]): Promise<boolean | ServerError> {
        let users = {
            users: userIDs
        };

        try {
            const response = await this.api.post(`/groups/${id}/unshare_group`, JSON.stringify(users));
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
}
