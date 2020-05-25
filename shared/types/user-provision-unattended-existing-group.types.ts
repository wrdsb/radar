import { User, Group } from "../teamViewerTypes";

interface UserProvisionUnattendedExistingGroupFunctionRequest {
    readonly payload: UserProvisionUnattendedExistingGroupFunctionRequestPayload;
}

interface UserProvisionUnattendedExistingGroupFunctionResponse {}
interface UserProvisionUnattendedExistingGroupFunctionLogObject {}
interface UserProvisionUnattendedExistingGroupFunctionCallbackMessage {}
interface UserProvisionUnattendedExistingGroupFunctionInvocationEvent {}

interface UserProvisionUnattendedExistingGroupFunctionRequestPayload {
    readonly name: string;
    readonly email: string;
    readonly group: Group;
}

interface UserProvisionUnattendedExistingGroupFunctionResponsePayload {
    userCreate: any,
    createdUser: User,
    sharedGroup: Group,
    groupShare: any,
    contactCreate: any
}

interface UserProvisionUnattendedExistingGroupFunctionLogObjectPayload {}
interface UserProvisionUnattendedExistingGroupFunctionCallbackMessagePayload {}
interface UserProvisionUnattendedExistingGroupFunctionInvocationEventPayload {}

export {
    UserProvisionUnattendedExistingGroupFunctionRequest,
    UserProvisionUnattendedExistingGroupFunctionResponse,
    UserProvisionUnattendedExistingGroupFunctionLogObject,
    UserProvisionUnattendedExistingGroupFunctionCallbackMessage,
    UserProvisionUnattendedExistingGroupFunctionInvocationEvent,
    UserProvisionUnattendedExistingGroupFunctionRequestPayload,
    UserProvisionUnattendedExistingGroupFunctionResponsePayload,
    UserProvisionUnattendedExistingGroupFunctionLogObjectPayload,
    UserProvisionUnattendedExistingGroupFunctionCallbackMessagePayload,
    UserProvisionUnattendedExistingGroupFunctionInvocationEventPayload
}