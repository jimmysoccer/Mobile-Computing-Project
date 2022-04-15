#include <chrono>
#include <thread>
#include <wiringPi.h>
#include <iostream>
#include <vector>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

using namespace std;

///LED on, off, blink, check status.
class led {
private:
    int pin = -1;
    bool currentStatus;
public:
    led(int pin) {
        this->pin = pin;
        currentStatus = false;
    }

    void start() {
        pinMode( pin, OUTPUT );
        digitalWrite(pin, HIGH);
        currentStatus = true;
    }

    void stop() {
        pinMode( pin, OUTPUT );
        digitalWrite(pin, LOW);
        currentStatus = false;
    }

    void blink(int sleep_time) { //button needs to declare pinMode, it needs a while loop to check status.
        digitalWrite(pin, HIGH);
        std::this_thread::sleep_for(std::chrono::seconds(sleep_time));
        digitalWrite(pin, LOW);
    }

    bool status() { return currentStatus; }

};

///check button status.
//button needs to declare pinMode, it needs a while loop to check status.
class button_detection {
private:
    int pin = -1;
public:
    button_detection(int pin) {
        this->pin = pin;
    }
    bool is_taped() {
        if(digitalRead(pin) == HIGH) return true;
        return false;
    }
};

///check temperature.
class tem_detection {
private:
    int pin = -1;
    int dht11_dat[5] = { 0, 0, 0, 0, 0 };
public:
    tem_detection(int pin) {
        this->pin = pin;
    }
    std::string check_tem() {
        uint8_t laststate	= HIGH;
        uint8_t counter		= 0;
        uint8_t j		= 0, i;
        float	f;

        dht11_dat[0] = dht11_dat[1] = dht11_dat[2] = dht11_dat[3] = dht11_dat[4] = 0;

        pinMode( pin, OUTPUT );
        digitalWrite( pin, LOW );
        delay( 18 );
        digitalWrite( pin, HIGH );
        delayMicroseconds( 40 );
        pinMode( pin, INPUT );

        for ( i = 0; i < 85; i++ ) ///max timing
        {
            counter = 0;
            while ( digitalRead( pin ) == laststate )
            {
                counter++;
                delayMicroseconds( 1 );
                if ( counter == 255 )
                {
                    break;
                }
            }
            laststate = digitalRead( pin );

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

        pinMode( DHTPIN, OUTPUT );
        digitalWrite( DHTPIN, LOW );
        delay( 18 );
        digitalWrite( DHTPIN, HIGH );
        delayMicroseconds( 40 );
        pinMode( DHTPIN, INPUT );

        for ( i = 0; i < MAXTIMINGS; i++ )
        {
            counter = 0;
            while ( digitalRead( DHTPIN ) == laststate )
            {
                counter++;
                delayMicroseconds( 1 );
                if ( counter == 255 )
                {
                    break;
                }
            }
            laststate = digitalRead( DHTPIN );

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
};

