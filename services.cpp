#include <chrono>
#include <thread>
#include <wiringPi.h>
#include <iostream>
#include <vector>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#define ledPin 17
#define buttonPin 27
#define temPin 22

using namespace std;

class services {
private:
    bool currentStatus;
    int dht11_dat[5] = { 0, 0, 0, 0, 0 };
public:
    services() {
        currentStatus = false;
    }

    void led_start() {
        pinMode( ledPin, OUTPUT );
        digitalWrite(ledPin, HIGH);
        currentStatus = true;
    }

    void led_stop() {
        pinMode( ledPin, OUTPUT );
        digitalWrite(ledPin, LOW);
        currentStatus = false;
    }

    void led_blink() { //button needs to declare pinMode, it needs a while loop to check status.
        while(true) {
            digitalWrite(ledPin, HIGH);
            std::this_thread::sleep_for(std::chrono::seconds(1));
            digitalWrite(ledPin, LOW);
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }
        currentStatus = true;
    }

    bool led_status() { return currentStatus; }

    std::string check_tem() {
        uint8_t laststate	= HIGH;
        uint8_t counter		= 0;
        uint8_t j		= 0, i;
        float	f;

        dht11_dat[0] = dht11_dat[1] = dht11_dat[2] = dht11_dat[3] = dht11_dat[4] = 0;

        pinMode( temPin, OUTPUT );
        digitalWrite( temPin, LOW );
        delay( 18 );
        digitalWrite( temPin, HIGH );
        delayMicroseconds( 40 );
        pinMode( temPin, INPUT );

        for ( i = 0; i < 85; i++ ) ///max timing
        {
            counter = 0;
            while ( digitalRead( temPin ) == laststate )
            {
                counter++;
                delayMicroseconds( 1 );
                if ( counter == 255 )
                {
                    break;
                }
            }
            laststate = digitalRead( temPin );

            if ( counter == 255 )
                break;

            if ( (i >= 4) && (i % 2 == 0) )
            {
                dht11_dat[j / 8] <<= 1;
                if ( counter > 16 )
                    dht11_dat[j / 8] |= 1;
                j++;
            }
        }

        if ( (j >= 40) &&
             (dht11_dat[4] == ( (dht11_dat[0] + dht11_dat[1] + dht11_dat[2] + dht11_dat[3]) & 0xFF) ) )
        {
            f = dht11_dat[2] * 9. / 5. + 32;
            return std::to_string(dht11_dat[2]) + std::to_string(dht11_dat[3]) + "F\n";
        }
        return "Data not good, skip\n";
    }

    std::string check_hum() {
        uint8_t laststate	= HIGH;
        uint8_t counter		= 0;
        uint8_t j		= 0, i;
        float	f;

        dht11_dat[0] = dht11_dat[1] = dht11_dat[2] = dht11_dat[3] = dht11_dat[4] = 0;

        pinMode( temPin, OUTPUT );
        digitalWrite( temPin, LOW );
        delay( 18 );
        digitalWrite( temPin, HIGH );
        delayMicroseconds( 40 );
        pinMode( temPin, INPUT );

        for ( i = 0; i < 85; i++ )
        {
            counter = 0;
            while ( digitalRead( temPin ) == laststate )
            {
                counter++;
                delayMicroseconds( 1 );
                if ( counter == 255 )
                {
                    break;
                }
            }
            laststate = digitalRead( temPin );

            if ( counter == 255 )
                break;

            if ( (i >= 4) && (i % 2 == 0) )
            {
                dht11_dat[j / 8] <<= 1;
                if ( counter > 16 )
                    dht11_dat[j / 8] |= 1;
                j++;
            }
        }

        if ( (j >= 40) &&
             (dht11_dat[4] == ( (dht11_dat[0] + dht11_dat[1] + dht11_dat[2] + dht11_dat[3]) & 0xFF) ) )
        {
            f = dht11_dat[2] * 9. / 5. + 32;
            return std::to_string(dht11_dat[0]) + "." + std::to_string(dht11_dat[1]) + "\n";
        }
        return "Data not good, skip\n";
    }

    bool is_taped() {
        pinMode(buttonPin, INPUT);
        while(true) {
            if(digitalRead(buttonPin) == HIGH) return true;
        }
        return false;
    }

};


