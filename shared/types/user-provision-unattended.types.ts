import { User, Group } from "../teamViewerTypes";

interface UserProvisionUnattendedFunctionRequest {
    readonly payload: UserProvisionUnattendedFunctionRequestPayload;
}

interface UserProvisionUnattendedFunctionResponse {}
interface UserProvisionUnattendedFunctionLogObject {}
interface UserProvisionUnattendedFunctionCallbackMessage {}
interface UserProvisionUnattendedFunctionInvocationEvent {}

interface UserProvisionUnattendedFunctionRequestPayload {
    readonly name: string;
    readonly email: string;
}

interface UserProvisionUnattendedFunctionResponsePayload {
    userCreate: any,
    createdUser: User,
    groupCreate: any,
    createdGroup: Group,
    groupShare: any,
    contactCreate: any
}

interface UserProvisionUnattendedFunctionLogObjectPayload {}
interface UserProvisionUnattendedFunctionCallbackMessagePayload {}
interface UserProvisionUnattendedFunctionInvocationEventPayload {}

export {
    UserProvisionUnattendedFunctionRequest,
    UserProvisionUnattendedFunctionResponse,
    UserProvisionUnattendedFunctionLogObject,
    UserProvisionUnattendedFunctionCallbackMessage,
    UserProvisionUnattendedFunctionInvocationEvent,
    UserProvisionUnattendedFunctionRequestPayload,
    UserProvisionUnattendedFunctionResponsePayload,
    UserProvisionUnattendedFunctionLogObjectPayload,
    UserProvisionUnattendedFunctionCallbackMessagePayload,
    UserProvisionUnattendedFunctionInvocationEventPayload
}