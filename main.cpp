#include "services.cpp"
#include <sstream>

using namespace std;




///连接





int main() {

    vector<vector<string>> Iot; // tweet format (thing identity, service, thing language, relationship, entity identity)

    ///收到Json，格式：(thing identity, service, thing language, relationship, entity identity, input1, input2), 如果同时传入多个services， 用句号“.”隔开。
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





}

