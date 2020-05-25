# Function: user-provision-multiple-existing-groups

For each user in payload, invoke function user-provision-unattended-existing-group.

## Request:
```
{
    "payload": [
        {
            "name": string;
            "email": string;
        }
    ]
}
```
