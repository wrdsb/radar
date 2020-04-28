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

interface UserQuery {
    email?: string;
    name?: string;
    permissions?: string[];
    full_list?: boolean
}

interface Group {
    id?: string;
    name?: string;
    shared_with?: User[];
    owner?: User;
    permissions?: string;
    policy_id?: string;
}

interface GroupQuery {
    name?: string;
    shared?: boolean;
}

interface Device {
    
}
