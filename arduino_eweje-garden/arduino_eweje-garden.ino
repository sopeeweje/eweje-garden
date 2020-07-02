#include <FirebaseCloudMessaging.h>
#include <Firebase.h>
#include <FirebaseHttpClient.h>
#include <FirebaseArduino.h>
#include <FirebaseError.h>
#include <FirebaseObject.h>
#include <ESP8266WiFi.h>
#include <TimeLib.h>
#include <time.h>
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
#define WIFI_SSID "744 S 19th St Apt 2 (2.4GHz)"

Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591);
Adafruit_Si7021 si7021 = Adafruit_Si7021();
Adafruit_seesaw ss;
char sensorName[8] = "Sensor1";
uint16_t light;
float temperature;
float humidity;
float soilTemp;
uint16_t soilMoisture;
int counter = 0;
 
void setup() { 
  Serial.begin(9600); 
 
  // connect to wifi. 
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD); 
  Serial.print("connecting"); 
  while (WiFi.status() != WL_CONNECTED) { 
    Serial.print("."); 
    delay(500); 
  } 
  Serial.println(); 
  Serial.print("connected: "); 
  Serial.println(WiFi.localIP()); 

  configTime(4 * 3600, 0, "pool.ntp.org", "time.nist.gov"); //(int timezoneinseconds, int daylightOffset_sec, const char* server1, const char* server2, const char* server3)
  Serial.println("\nWaiting for time");
  while (!time(nullptr)) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("");

  tsl.setGain(TSL2591_GAIN_MED);      // 25x gain 
  tsl.setTiming(TSL2591_INTEGRATIONTIME_300MS);
  si7021.begin();
  si7021.heater(false);
  ss.begin(0x36);
  pinMode(12, OUTPUT);
  digitalWrite(12, LOW);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); 
} 
 
void loop() {
  StaticJsonBuffer<200> dataPoint_buffer;
  JsonObject& dataPoint = dataPoint_buffer.createObject();
  
  time_t now = time(nullptr);
  String dateTime = ctime(&now); //Wed Jul  1 11:43:53 2020
  light = tsl.getLuminosity(TSL2591_FULLSPECTRUM);
  temperature = 1.8*si7021.readTemperature()+32;
  humidity = si7021.readHumidity();
  if (counter == 600){
    digitalWrite(12, HIGH);
    delay(1000);
    soilTemp = ss.getTemp();
    soilMoisture = ss.touchRead(0);
    digitalWrite(12, LOW);
    counter = 0;
    dataPoint["soil_temp"] = 1.8*soilTemp+32;
    dataPoint["soil_moisture"] = soilMoisture;
  }
  else{
    dataPoint["soil_temp"] = "-";
    dataPoint["soil_moisture"] = "-";
  }
  
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
  counter++;
  delay(1000);
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
