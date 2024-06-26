#include <WiFi.h>
#include <PubSubClient.h>
#include <WiFiClientSecure.h>
#include <env.h>

#define LED_PIN 2

// WiFi credentials
const char *ssid = "Galaxy A51FEB0"; // Replace with your WiFi name
const char *password = "password";   // Replace with your WiFi password

// WPAS Enterprise credentials
const char *wpa2_enterprise_username = WPA2_ENTERPRISE_USERNAME;
const char *wpa2_enterprise_password = WPA2_ENTERPRISE_PASSWORD;
const char *wpa2_enterprise_identity = WPA2_ENTERPRISE_IDENTITY;

// MQTT Broker settings
const char *mqtt_broker = MQTT_URL;
const char *mqtt_topic = MQTT_TOPIC;
const char *mqtt_username = MQTT_USER;
const char *mqtt_password = MQTT_PASS;

const int mqtt_port = MQTT_PORT;

// WiFi and MQTT client initialization
WiFiClientSecure esp_client;
PubSubClient mqtt_client(esp_client);

// Root CA Certificate

// Load DigiCert Global Root CA ca_cert, which is used by EMQX Serverless Deployment

const char *ca_cert = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT
MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j
b20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB
CSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97
nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt
43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P
T19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4
gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO
BgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR
TLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw
DQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr
hMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg
06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF
PnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls
YSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk
CAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=
-----END CERTIFICATE-----
)EOF";

// Function Declarations
void connectToWiFi();

void connectToMQTT();

void mqttCallback(char *topic, byte *payload, unsigned int length);

void setup()
{
    Serial.begin(9600);
    while (!Serial)
    {
        delay(100);
    }

    pinMode(LED_PIN, OUTPUT);

    if (USING_ENTERPRISE_WIFI)
    {
        Serial.println("Using WPA2 Enterprise WiFi");
        connectToEnterpriseWifi();
    }
    else
    {
        Serial.println("Using WPA2 Personal WiFi");
        connectToWiFi();
    }

    // Set Root CA certificate
    esp_client.setCACert(ca_cert);

    mqtt_client.setServer(mqtt_broker, mqtt_port);
    mqtt_client.setKeepAlive(60);
    mqtt_client.setCallback(mqttCallback);
    connectToMQTT();
}

void connectToEnterpriseWifi()
{
    WiFi.disconnect(true); // Disconnect from any previous connections
    WiFi.mode(WIFI_STA);   // Set WiFi mode to station

    // Set WiFi credentials for WPA2 Enterprise
    WiFi.begin(ssid, WPA2_ENTERPRISE_USERNAME, WPA2_ENTERPRISE_PASSWORD, password);

    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");
}

void connectToWiFi()
{
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");
}

void connectToMQTT()
{
    while (!mqtt_client.connected())
    {
        String client_id = "esp32-client-" + String(WiFi.macAddress());
        Serial.printf("Connecting to MQTT Broker as %s...\n", client_id.c_str());
        if (mqtt_client.connect(client_id.c_str(), mqtt_username, mqtt_password))
        {
            Serial.println("Connected to MQTT broker");
            mqtt_client.subscribe(mqtt_topic);
        }
        else
        {
            Serial.print("Failed to connect to MQTT broker, rc=");
            Serial.print(mqtt_client.state());
            Serial.println(" Retrying in 5 seconds.");
            delay(5000);
        }
    }
}
void mqttCallback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message received on topic: ");
    Serial.println(topic);
    Serial.print("Message: ");
    for (unsigned int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }
    Serial.println("\n-----------------------");

    // Check if the message is "press"
    if (strncmp((char *)payload, "press", length) == 0)
    {
        digitalWrite(LED_PIN, HIGH); // Set pin 2 to high
        delay(1000);                 // Wait for 1 second
        digitalWrite(LED_PIN, LOW);  // Set pin 2 to low
    }
}

void loop()
{
    if (!mqtt_client.connected())
    {
        connectToMQTT();
    }
    mqtt_client.loop();
}