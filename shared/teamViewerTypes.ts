interface User {
    id?: string;
    sso_customer_id?: string;
    name?: string;
    email?: string;
    password?: string;
    permissions?: string[];
    active?: boolean;
    custom_quicksupport_id?: string;
    custom_quickjoin_id?: string;
    last_access_date?: string;
    activated_license_id?: string;
    activated_license_name?: string;
    activated_subLicense_name?: string;
    language?: string;
}

interface Group {
    id?: string;
    name?: string;
    shared_with?: User[];
    owner?: User;
    permissions?: string;
    policy_id?: string;
}

interface UserCreatePayload {
    payload: User;
}

interface UserDeletePayload {
    payload: string;
}

interface UserGetPayload {
    payload: string;
}

interface UserUpdatePayload {
    payload: User
}

interface GroupCreatePayload {
    payload: Group;
}

interface GroupDeletePayload {
    payload: string;
}

interface GroupGetPayload {
    payload: string;
}

interface GroupUpdatePayload {
    payload: Group;
}

interface UsersListResponse {
    users: User[];
}

interface GroupsListResponse {
    groups: Group[];
}

interface UserQuery {
    email?: string;
    name?: string;
    permissions?: string[];
    full_list?: boolean
}

interface GroupQuery {
    name?: string;
    shared?: boolean;
}

interface Device {
}

export {
    User,
    Group,
    UserCreatePayload,
    UserDeletePayload,
    UserGetPayload,
    UserUpdatePayload,
    GroupCreatePayload,
    GroupDeletePayload,
    GroupGetPayload,
    GroupUpdatePayload,
    UsersListResponse,
    GroupsListResponse,
    UserQuery,
    GroupQuery
}