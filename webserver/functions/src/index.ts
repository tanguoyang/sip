import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { getFirestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";
import * as mqtt from "mqtt";
import * as dotenv from "dotenv";

// Define the API key type
interface ApiKey {
  deviceIds: string[];
}

dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = getFirestore(admin.app());

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL as string;
const EMQX_TOPIC_PREFIX = "devices/";
const MQTT_CLIENTID = "admin";
const MQTT_USERNAME = process.env.MQTT_USERNAME as string;
const MQTT_PASSWORD = process.env.MQTT_PASSWORD as string;

export const triggerDevicePress = onRequest(async (request, response) => {
  const { deviceId } = request.query;
  const authorization = request.headers.authorization;

  console.log("Triggering device press", deviceId, authorization);

  if (!deviceId || !authorization) {
    response.status(400).send("Missing deviceId or authorization header");
    return;
  }

  try {
    const apiKeyDoc = await db.collection("apiKeys").doc(authorization).get();
    if (!apiKeyDoc.exists) {
      response.status(401).send("Unauthorized");
      return;
    }

    const apiKeyData = apiKeyDoc.data() as ApiKey;
    if (!apiKeyData.deviceIds.includes(deviceId as string)) {
      response.status(403).send("Forbidden");
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const client = mqtt.connect(MQTT_BROKER_URL, {
        clientId: MQTT_CLIENTID,
        username: MQTT_USERNAME,
        password: MQTT_PASSWORD,
      });

      client.on("connect", () => {
        const topic = `${EMQX_TOPIC_PREFIX}${deviceId}`;
        client.publish(topic, "press", { qos: 1 }, (err) => {
          if (err) {
            logger.error("MQTT publish error", err);
            response.status(500).send("Failed to trigger device press");
            reject(err);
          } else {
            db.collection("logs")
              .add({
                message: `${deviceId} triggered.`,
                createdAt: Date.now(),
                status: "INFO",
              })
              .then(() => {
                response
                  .status(200)
                  .send("Device press triggered successfully");
                resolve();
              });
          }
          client.end();
        });
      });

      client.on("error", (err) => {
        logger.error("MQTT connection error", err);
        response.status(500).send("Failed to connect to MQTT broker");
        client.end();
        reject(err);
      });
    });
  } catch (error) {
    logger.error("Error", error);
    response.status(500).send("Internal Server Error");
  }

  return;
});
