#include <FirebaseCloudMessaging.h>
#include <Firebase.h>
#include <FirebaseHttpClient.h>
#include <FirebaseArduino.h>
#include <FirebaseError.h>
#include <FirebaseObject.h>
#include <ESP8266WiFi.h>
#include <TimeLib.h>
#include <time.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ESP8266HTTPUpdateServer.h>
#include <DS1307RTC.h>  // a basic DS1307 library that returns time as a time_t
#include <Adafruit_TSL2591.h> //Light sensor
#include <Adafruit_Si7021.h> //temp and humidity sensor
#include <Adafruit_miniTFTWing.h>
#include <seesaw_servo.h>
#include <Adafruit_Crickit.h>
#include <seesaw_neopixel.h>
#include <Adafruit_TFTShield18.h>
#include <seesaw_motor.h>
#include <Adafruit_NeoTrellis.h>
#include <Adafruit_seesaw.h>
#include <ArduinoJson.h>

#include "FirebaseAuth.h"
//authentication token defined in separate private file (FIREBASE_AUTH)
//wifi password defined in separate file (WIFI_PASSWORD)

// Set these to run example. 
#define FIREBASE_HOST "eweje-garden.firebaseio.com"
#define WIFI_SSID1 "eweje3"
#define WIFI_SSID2 "eweje3_5GHz"
#define WIFI_SSID3 "eweje2"
#define WIFI_SSID4 "2400 Catharine St Apt2 (2.4GHz)"
#define ELEMENTS(x) (sizeof(x) /  sizeof(x[0]))

String networks[4] = {WIFI_SSID1, WIFI_SSID2, WIFI_SSID3, WIFI_SSID4};
String passwords[4] = {WIFI_PASSWORD_HOME, WIFI_PASSWORD_HOME, WIFI_PASSWORD_HOME, WIFI_PASSWORD_ME};

Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591);
Adafruit_Si7021 si7021 = Adafruit_Si7021();
Adafruit_seesaw ss;
char sensorName[8] = "Sensor3";
uint16_t light;
float temperature;
float humidity;
float soilTemp;
uint16_t soilMoisture;
int counter = 0;

const char* host = "sensor3-webupdate";
ESP8266WebServer httpServer(80);
ESP8266HTTPUpdateServer httpUpdater;

bool connectToWiFi(String network, String password){
  WiFi.begin(network, password); 
  for (int j = 0; j < 10; j++) {
    if (WiFi.waitForConnectResult() != WL_CONNECTED){
      Serial.println("Connection to " + network + " failed. Trying again.");
    }
    else{
      Serial.println("Connected to " + network + ".");
      return true;
      break;
    }
  }
  Serial.println("Connection to " + network + " failed. Trying next one.");
  return false;
}

void setup() { 
  Serial.begin(115200); 
 
  // connect to wifi. 
  WiFi.mode(WIFI_AP_STA);
  bool connection = false;
  while(1){
    if (not connection){
      connection = connectToWiFi(WIFI_SSID1, WIFI_PASSWORD_HOME);
    }
    else{
      break;
    }
    
    if (not connection){
      connection = connectToWiFi(WIFI_SSID2, WIFI_PASSWORD_HOME);
    }
    else{
      break;
    }
    
    if (not connection){
      connection = connectToWiFi(WIFI_SSID3, WIFI_PASSWORD_HOME);
    }
    else{
      break;
    }
    
    if (not connection){
      connection = connectToWiFi(WIFI_SSID4, WIFI_PASSWORD_ME);
    }
    else{
      break;
    }
  }
  
  MDNS.begin(host);
  httpUpdater.setup(&httpServer);
  httpServer.begin();
  MDNS.addService("http", "tcp", 80);
  Serial.printf("HTTPUpdateServer ready! Open http://%s.local/update in your browser\n", host);

  configTime(4 * 3600, 0, "pool.ntp.org", "time.nist.gov"); //(int timezoneinseconds, int daylightOffset_sec, const char* server1, const char* server2, const char* server3)
  Serial.println("\nWaiting for time");
  while (!time(nullptr)) {
    Serial.print(".");
    delay(1000);
  }
  time_t now = time(nullptr);
  while (now < 10000){
    Serial.println(now);
    now = time(nullptr);
    delay(1000);
  }
  Serial.println("Got the time.");

  tsl.setGain(TSL2591_GAIN_LOW);      // 25x gain 
  tsl.setTiming(TSL2591_INTEGRATIONTIME_300MS);
  si7021.begin();
  si7021.heater(false);
  ss.begin(0x36);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); 
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(12, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  digitalWrite(12, HIGH);
  delay(5000);
} 
 
void loop() {
  Serial.println("I woke up");
  httpServer.handleClient();
  MDNS.update();
  StaticJsonBuffer<200> dataPoint_buffer;
  JsonObject& dataPoint = dataPoint_buffer.createObject();
  
  time_t now = time(nullptr);
  String dateTime = ctime(&now); //Wed Jul  1 11:43:53 2020
  light = tsl.getLuminosity(TSL2591_FULLSPECTRUM);
  temperature = 1.8*si7021.readTemperature()+32;
  humidity = si7021.readHumidity();
  soilTemp = ss.getTemp();
  soilMoisture = ss.touchRead(0);

  dataPoint["soil_temp"] = 1.8*soilTemp+32;
  dataPoint["soil_moisture"] = soilMoisture;
  dataPoint["date"] = getDate(dateTime);
  dataPoint["time"] = getTime(dateTime);
  dataPoint["sensor"] = sensorName;
  dataPoint["light"] = light;
  dataPoint["temp"] = temperature;
  dataPoint["humidity"] = humidity;
  
  dataPoint.printTo(Serial);
  Serial.println("");
  Firebase.push("data", dataPoint); 
  // handle error 
  if (Firebase.failed()) { 
      Serial.print("pushing /logs failed:"); 
      Serial.println(Firebase.error());   
      return; 
  }
  Serial.println("I went to sleep");
  ESP.deepSleep(540e6); 
}

String getDate(String cdt){
  String currentDate = cdt.substring(4,7)+'-'+cdt.substring(8,10)+'-'+cdt.substring(20,24);
  currentDate.replace(" ", "");
  return currentDate;
}

String getTime(String cdt){
  String currentTime = cdt.substring(11,19);
  currentTime.replace(":", "");
  return currentTime;
}
