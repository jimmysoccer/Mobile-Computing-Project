#include "services.cpp"
#include <cpprest/http_msg.h>
#include "rest.hpp"
#include <sstream>
#include <iostream>
#define ledPin 17

using namespace std;

void getit(web::http::http_request msg) {
    cout << msg.to_string() << endl;
    msg.reply(200, web::json::value::number(42));
}

void stopAll(services* A, services* B) {
    A->led_stop();
    B->led_stop();
}


int main() {
    wiringPiSetupGpio();

    auto getit_rest = rest::make_endpoint("/initialTweet");
    getit_rest.support(web::http::methods::GET, getit);

    // Start the endpoints in sequence.
    std::this_thread::sleep_for(0.5s);
    getit_rest.open().wait();

    vector<vector<string>> Iot; // tweet format (thing identity, service, thing language, relationship, entity identity)

    ///收到Json，格式：(thing identity, service, thing language, relationship, entity identity), 如果同时传入多个services， 用句号“.”隔开。
    ///如果任何东西没有值，就null，比如想要relationship就必须要两个services， 没有的话relationship就写null。

    ///Json转string, 放到tweet里。
    string tweet = "";

    vector<string> s;
    string temp = "";
    stringstream stream(tweet);
    while(getline(stream, temp, '.')) s.push_back(temp);
    for(int i = 0; i < temp.size(); ++i) {
        vector<string> curr;
        string disassemble = "";
        stringstream stream2(s[i]);
        while(getline(stream2, disassemble, ',')) curr.push_back(disassemble);
        Iot.push_back(curr);
    }

    ///现在Iot里有所有的服务，最高支持2个services同时运行，格式：
    ///thing identity, service, thing language, relationship, entity identity, input1, input2
    ///thing identity, service, thing language, relationship, entity identity, input1, input2
    ///第一个services是A， 第二个services是B。

    services* A = new services();
    services* B = nullptr;
    if(Iot.size() > 1) B = new services();

    services* t = A;
    string output = "";
    if (Iot.size() > 0 && Iot[0][3] == "null") {
        for (int i = 0; i < Iot.size(); ++i) {
            if (Iot[i][1] == "led on") t->led_start();
            else if(Iot[i][1] == "led off") t->led_stop();
            else if(Iot[i][1] == "led blink") t->led_blink();
            else if(Iot[i][1] == "check temperature") t->check_tem();
            else if(Iot[i][1] == "check humidity") t->check_hum();
            t = B;
        }
    } else if(Iot.size() > 0) {
        if(Iot[0][3] == "control") {
            if(Iot[0][1] == "led on") {
                bool status = A->led_status();
                string iotB = Iot[1][1];
                if(iotB == "led off" && status) A->led_stop();
                else if(iotB == "led blink" && status) A->led_blink();
                else if(iotB == "check temperature" && status) output = B->check_tem();
                else if(iotB == "check humidity" && status) output = B->check_hum();
            }else if(Iot[0][1] == "led off") {
                bool status = A->led_status();
                string iotB = Iot[1][1];
                if(iotB == "led on" && !status) A->led_start();
                else if(iotB == "led blink" && !status) A->led_blink();
                else if(iotB == "check temperature" && !status) output = B->check_tem();
                else if(iotB == "check humidity" && !status) output = B->check_hum();
            }else if(Iot[0][1] == "button check") {
                bool status = A->is_taped();
                string iotB = Iot[1][1];
                if(iotB == "led on" && status) B->led_start();
                else if(iotB == "led blink" && status) B->led_blink();
                else if(iotB == "check temperature" && status) output = B->check_tem();
                else if(iotB == "check humidity" && status) output = B->check_hum();
            }
        } else if(Iot[0][3] == "drive") {
            bool status = A->is_taped();
            string iotB = Iot[1][1];
            if(iotB == "led on" && status) B->led_start();
            else if(iotB == "led blink" && status) B->led_blink();
            else if(iotB == "check temperature" && status) output = B->check_tem();
            else if(iotB == "check humidity" && status) output = B->check_hum();
        } else if(Iot[0][3] == "subsume") {
            string iotB = Iot[1][1];
            if(Iot[0][1] == "led blink") A->led_start();
        } else if(Iot[0][3] == "contest") {
            string iotB = Iot[1][1];
            if(Iot[0][1] == "led blink" && iotB == "led on") A->led_start();
        }
    }

    if(output != "") {
        ///return output value.
    }
    cout << "sadasd" << endl;



    return 0;

}

