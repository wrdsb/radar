# Function: user-provision

* Share individual Group with User
* Add User as Contact to users-unattended-access Group

## Request:
```
{
    "payload": {
      "name": string;
      "email": string;
      "group": Group;
      "user": User;
    }
}
```
