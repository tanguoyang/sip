# Trigger Device Press API

## Overview

The `triggerDevicePress` API endpoint allows authorized clients to trigger a device press action HTTP.

## BaseURL

```
curl -X POST "https://triggerdevicepress-73gsig7a6q-uc.a.run.app/triggerDevicePress?deviceId=<DEVICE_ID>" \
     -H "Authorization: <YOUR_API_KEY>"
```

## Endpoint

```

POST /triggerDevicePress

```

## Query Parameters

- `deviceId` (required): The ID of the device to be triggered.

## Headers

- `Authorization` (required): The API key for authorization.

## Response Codes

- `200 OK`: Device press triggered successfully.
- `400 Bad Request`: Missing `deviceId` or `authorization` header.
- `401 Unauthorized`: The API key is not valid.
- `403 Forbidden`: The API key does not have permission to trigger the specified device.
- `500 Internal Server Error`: An error occurred while processing the request.

## Example Request

```sh
curl -X POST "https://triggerdevicepress-73gsig7a6q-uc.a.run.app/triggerDevicePress?deviceId=<DEVICE_ID>" \
     -H "Authorization: <YOUR_API_KEY>"
```

## Example Response

```text
Device press triggered successfully
```
