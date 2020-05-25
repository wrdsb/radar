import { AzureFunction, Context } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos";
import { createLogObject } from "../shared/createLogObject";
import { storeLogBlob } from "../shared/storeLogBlob";
import { createCallbackMessage } from "../shared/createCallbackMessage";
import { createEvent } from "../shared/createEvent";
import { UserProvisionUnattendedExistingGroupFunctionRequestPayload } from "../shared/types/user-provision-unattended-existing-group.types";

const usersProvisionMultipleExistingGroups: AzureFunction = async function (context: Context, triggerMessage: any): Promise<void> {
    const functionInvocationID = context.executionContext.invocationId;
    const functionInvocationTime = new Date();
    const functionInvocationTimestamp = functionInvocationTime.toJSON();  // format: 2012-04-23T18:25:43.511Z

    const functionName = context.executionContext.functionName;
    const functionEventType = 'WRDSB.RADAR.User.Provision.Multiple.ExistingGroup';
    const functionEventID = `radar-functions-${functionName}-${functionInvocationID}`;
    const functionLogID = `${functionInvocationTime.getTime()}-${functionInvocationID}`;

    const logStorageAccount = process.env['storageAccount'];
    const logStorageKey = process.env['storageKey'];
    const logStorageContainer = 'function-users-provision-multiple-existing-groups-logs';

    const eventLabel = '';
    const eventTags = [
        "radar", 
    ];

    const allGroups = context.bindings.allGroups;

    const triggerObject = triggerMessage;
    const payload = triggerObject.payload;

    let sortedGroups = {};
    let queueMessages = [];

    allGroups.forEach(group => {
        const key = group.name.replace('Devices | Host | ', '');
        sortedGroups[key] = {
            id: group.id,
            name: group.name,
            permissions: group.permissions
        }
    });

    payload.forEach(user => {
        let messagePayload = {
            name: user.name,
            email: user.email,
            group: sortedGroups[user.email.replace('@wrdsb.ca', '')]
        } as UserProvisionUnattendedExistingGroupFunctionRequestPayload;

        let message = {
            payload: messagePayload
        }
        
        context.log(message);
        queueMessages.push(message);
    });

    context.bindings.userProvisionQueue = JSON.stringify(queueMessages);

    const logPayload = {
        queueMessages: queueMessages
    }
    context.log(logPayload);

    const logObject = await createLogObject(functionInvocationID, functionInvocationTime, functionName, logPayload);
    const logBlob = await storeLogBlob(logStorageAccount, logStorageKey, logStorageContainer, logObject);
    context.log(logBlob);

    const callbackMessage = await createCallbackMessage(logObject, 200);
    context.bindings.callbackMessage = JSON.stringify(callbackMessage);
    context.log(callbackMessage);

    const invocationEvent = await createEvent(
        functionInvocationID,
        functionInvocationTime,
        functionInvocationTimestamp,
        functionName,
        functionEventType,
        functionEventID,
        functionLogID,
        logStorageAccount,
        logStorageContainer,
        eventLabel,
        eventTags
    );
    context.bindings.flynnEvent = JSON.stringify(invocationEvent);
    context.log(invocationEvent);

    context.done(null, logBlob);
};

export default usersProvisionMultipleExistingGroups;
