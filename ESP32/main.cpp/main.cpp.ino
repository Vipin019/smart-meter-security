#include <Arduino.h>
#include <WiFi.h>             //use for wifi time connection
#include <WebSocketsServer.h> //use for sending data in real time
#include <ArduinoJson.h>      // Include the ArduinoJson library
#include <EmonLib.h>          //use to read electrical parameters

EnergyMonitor emon; // declare emon variavle of EnergyMonitor data type
#define vCalibration 83.3
#define currCalibration 0.50

float kWh = 0;
unsigned long lastmillis = millis();

const char *ssid = "YOUR_SSID";         // Replace with your WiFi SSID
const char *password = "YOUR_PASSWORD"; // Replace with your WiFi Password

WiFiServer server(80);
WebSocketsServer webSocket = WebSocketsServer(81);

String myTimerEvent()
{
    emon.calcVI(20, 2000);

    kWh = kWh + emon.apparentPower * (millis() - lastmillis) / 3600000000.0;

    // yield();

    // Create a JSON object
    DynamicJsonDocument jsonDoc(200); // 200 is the ram allocated

    Serial.print("Vrms: ");
    Serial.print(emon.Vrms, 2);
    Serial.print("V");
    jsonDoc["vrms"] = emon.Vrms;
    delay(100);

    Serial.print("\tIrms: ");
    Serial.print(emon.Irms, 4);
    Serial.print("A");
    jsonDoc["irms"] = emon.Irms;
    delay(100);

    Serial.print("\tApparent Power: ");
    Serial.print(emon.apparentPower, 4);
    Serial.print("W");
    jsonDoc["apparentPower"] = emon.apparentPower;
    delay(100);

    Serial.print("\tReal Power: ");
    Serial.print(emon.realPower, 4);
    Serial.print("W");
    jsonDoc["realPower"] = emon.realPower;
    delay(100);

    Serial.print("\tkWh: ");
    Serial.print(kWh, 5);
    Serial.println("kWh");
    jsonDoc["kwh"] = kWh;
    delay(100);

    String jsonString;
    // Serialize the JSON object to a string
    serializeJson(jsonDoc, jsonString);

    return jsonString;
}

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

    emon.voltage(35, vCalibration, 1.7); // Voltage: input pin, calibration, phase_shift
    emon.current(34, currCalibration);   // Current: input pin, calibration.

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

    pinMode(LED_BUILTIN, OUTPUT);// initialize digital pin LED_BUILTIN as an output.
}

void loop()
{
    webSocket.loop();

    String jsonString = myTimerEvent();

    webSocket.broadcastTXT(jsonString);

    digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
    delay(1500);                      // wait for a second
    digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
    delay(1500);                      // wait for a second
}
