# Registering a new Device

The platform allows adding any number of devices. To register a new device:

### 1. Determine a `DeviceID`

A device id is a unique key used to identify a device. No 2 devices should have the same device id. You can generate a new `DeviceID` [here](https://www.uuidgenerator.net/)

### 2. Flash the ESP32 device

We have released the code template to flash an esp32 that can connect to a MQTT server. Make changes to `env.h` file to add your own `DeviceID`

### 3. Register your device in the webapp

Using the same `DeviceID`, create a new device in the webapp.

# Conclusion

And thats it! You have added a new device to the platform. You can now begin controlling it via API keys!
