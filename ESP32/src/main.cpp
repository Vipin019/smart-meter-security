#include <Arduino.h>
#include <WiFi.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h> // Include the ArduinoJson library

const char *ssid = "YOUR_SSID";         // Replace with your WiFi SSID
const char *password = "YOUR_PASSWORD"; // Replace with your WiFi Password

WiFiServer server(80);
WebSocketsServer webSocket = WebSocketsServer(81);

const int pin1 = 2; // Replace with the actual pin numbers you want to read
const int pin2 = 3;

void webSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case WStype_CONNECTED:
    Serial.printf("[%u] Connection established.\n", num);
    break;
  case WStype_DISCONNECTED:
    Serial.printf("[%u] Disconnected.\n", num);
    break;
  default:
    break;
  }
}

void setup()
{
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  server.begin();
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
}

void loop()
{
  webSocket.loop();

  // Read the pins
  int pinValue1 = digitalRead(pin1);
  int pinValue2 = digitalRead(pin2);

  // Create a JSON object
  DynamicJsonDocument jsonDoc(200);
  jsonDoc["pin1"] = pinValue1;
  jsonDoc["pin2"] = pinValue2;

  // Serialize the JSON object to a string
  String jsonString;
  serializeJson(jsonDoc, jsonString);

  // Send the JSON string to connected clients
  webSocket.broadcastTXT(jsonString);

  delay(1000); // Adjust as needed to control update rate
}
