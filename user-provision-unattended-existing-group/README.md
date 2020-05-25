# Function: user-provision-unattended-existing-group

* Create User for user
* Retrieve pre-created Group from Cosmos DB
* Share individual Group with User
* Add User as Contact to users-unattended-access Group

## Request:
```
{
    "payload": {
      "name": string;
      "email": string;
    }
}
```
