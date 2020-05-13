import { AzureFunction, Context } from "@azure/functions"
import { createLogObject } from "../shared/createLogObject";
import { storeLogBlob } from "../shared/storeLogBlob";
import { createCallbackMessage } from "../shared/createCallbackMessage";
import { createEvent } from "../shared/createEvent";
import { teamViewerUserAPI } from "../shared/teamViewerUserAPI";
import { teamViewerGroupAPI } from "../shared/teamViewerGroupAPI";
import { teamViewerContactAPI } from "../shared/teamViewerContactAPI";

const userProvisionUnattended: AzureFunction = async function (context: Context, triggerMessage: any): Promise<void> {
    const functionInvocationID = context.executionContext.invocationId;
    const functionInvocationTime = new Date();
    const functionInvocationTimestamp = functionInvocationTime.toJSON();  // format: 2012-04-23T18:25:43.511Z

    const functionName = context.executionContext.functionName;
    const functionEventType = 'WRDSB.RADAR.User.Unattended.Provision';
    const functionEventID = `radar-functions-${functionName}-${functionInvocationID}`;
    const functionLogID = `${functionInvocationTime.getTime()}-${functionInvocationID}`;

    const logStorageAccount = process.env['storageAccount'];
    const logStorageKey = process.env['storageKey'];
    const logStorageContainer = 'function-user-provision-unattended-logs';

    const eventLabel = '';
    const eventTags = [
        "radar", 
    ];

    const triggerObject = triggerMessage;
    const payload = triggerObject.payload;
    let result = {
        userCreate: null,
        createdUser: null,
        groupCreate: null,
        createdGroup: null,
        groupShare: null,
        contactCreate: null
    };

    const apiToken = "Bearer " + process.env['userToken'];
    const userAPIClient = new teamViewerUserAPI(apiToken);
    const groupAPIClient = new teamViewerGroupAPI(apiToken);
    const contactAPIClient = new teamViewerContactAPI(apiToken);

    // create user
    const user = {
        name: payload.name,
        email: payload.email,
        permissions: "ShareOwnGroups,EditConnections,ViewOwnConnections",
        active: true,
        log_sessions: true,
        show_comment_window: false,
        language: "en",
        sso_customer_id: process.env['ssoCustomerID'],
        activated_license_id: process.env['activatedLicenseID'],
        activated_license_name: process.env['activatedLicenseName'],
        activated_subLicense_name: process.env['activatedSubLicenseName']
    };
    result.userCreate = await userAPIClient.create(user);
    if (result.userCreate.code === 201) {
        result.createdUser = result.userCreate.user;
    }

    // create individual group, with policy attached
    // Devices | Host | email_slug
    const group = {
        name: `Devices | Host | ${payload.email.replace('@wrdsb.ca', '')}`,
        policy_id: process.env['unattendedUserGroupPolicyID']
    }
    result.groupCreate = await groupAPIClient.create(group);
    if (result.groupCreate.code === 201) {
        result.createdGroup = result.groupCreate.group;
    }

    if (result.createdUser.code === 201 && result.createdGroup.code === 201) {
        // share individual group with user
        const userShares = [
            {
                userid: result.createdUser.user.id,
                permissions: 'read'
            }
        ]
        result.groupShare = await groupAPIClient.share(result.createdGroup.group.id, userShares);

        // add user as contact to users-unattended-access group
        const contact = {
            email: result.createdUser.email,
            groupid: result.createdGroup.id
        };
        result.contactCreate = await contactAPIClient.create(contact);
    }

    const logPayload = result;
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

export default userProvisionUnattended;