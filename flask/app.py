import json
import os
import time

from flask import Flask, request, jsonify

app = Flask(__name__)

Thing_ID = []
ServiceName = []
IP_Addr = []


@app.route('/getThingID', methods=['GET', 'POST'])
def get_thingID():
    if request.method == 'GET':
        with open("./ThingID.txt", 'r') as f:
            Thing_ID = f.read().strip()
        return Thing_ID, 200


@app.route("/getServiceName", methods=['GET', 'POST'])
def get_serviceName():
    if request.method == 'GET':
        with open("./ServiceName.txt", 'r') as f:
            serviceName = f.read().strip()
        return serviceName, 200


@app.route("/getIPAddr", methods=['GET', 'POST'])
def get_IP():
    if request.method == 'GET':
        with open("./IPAddr.txt", 'r') as f:
            IP_Addr = f.read().strip()
        return IP_Addr, 200


@app.route("/getStatus", methods=['GET', 'POST'])
def get_status():
    if request.method == 'GET':
        substring1 = "True"
        with open("./isScanning.txt", 'r') as f:
            a = f.read().strip()

        if substring1 in a:
            return jsonify("Scanning"), 200
        else:
            return jsonify("Done"), 200


@app.route("/saveAPP", methods=['GET', 'POST'])
def save_app():
    if request.method == 'POST':
        content = request.json
        name = content['appname']
        app = content['app']

        filepath = "./apps/" + name + ".txt"
        with open(filepath, 'a') as f:
            f.writelines(app)
        return jsonify("App saved!"), 200


@app.route("/uploadAPP", methods=['GET', 'POST'])
def upload_app():
    if request.method == 'POST':
        content = request.json
        name = content['appname']

        filepath = "./apps/" + name
        if os.path.isfile(filepath) is False:
            return jsonify("APP does not exist!"), 405
        else:
            with open(filepath, 'r') as f:
                a = f.read().strip()
            return jsonify(a), 201


@app.route("/delAPP", methods=['DELETE'])
def del_app():
    content = request.json
    app_name = content['appname']

    path = "./apps/" + app_name
    if os.path.isfile(path) :
        os.remove(path)
        return jsonify("App deleted!"), 201
    else:
        return jsonify("APP not exist!"), 405


def getFileName(path):
    for root, dirs, files1 in os.walk(path):
       print(files1)
    files = []
    for i in range(len(files1)):
        files.append(files1[i].split(".")[0])

    return files


@app.route("/scan", methods=['GET'])
def scan():

    repository = "./apps/"

    files = getFileName(repository)

    return jsonify(files), 200


@app.route("/activate", methods=['POST'])
def activate():
    content = request.json
    recipe = content['recipe']

    path1 = "C:/Users/38658/PycharmProjects/pythonProject3/activate.txt"
    path2 = "C:/Users/38658/PycharmProjects/pythonProject3/isActivate.txt"
    tem_path = "./tempreture.txt"

    with open(path1, 'w') as f:
        f.writelines(recipe)

    with open(path2, 'w') as f1:
        f1.writelines("True")

    subs = "tem"
    res = "APP Activated!"
    if subs in recipe:
        time.sleep(2)
        with open(tem_path, 'r') as f2:
            a = f2.read().strip()
        if len(a) > 1:
            res = a

    return jsonify(res), 200


@app.route("/stop", methods=['PUT'])
def stop():

    path1 = "C:/Users/38658/PycharmProjects/pythonProject3/activate.txt"
    path2 = "C:/Users/38658/PycharmProjects/pythonProject3/isActivate.txt"

    with open(path1, 'w') as f:
        f.writelines(" ")

    with open(path2, 'w') as f1:
        f1.writelines("stop")

    return jsonify("APP Stopped!"), 200


if __name__ == '__main__':
    app.run()

