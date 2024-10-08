from flask import Flask, jsonify
import os
import socket
import subprocess

app = Flask(__name__)

def getSystemInfo():
    ip_address = socket.gethostbyname(socket.gethostname())
    processes = subprocess.check_output(['ps']).decode('utf-8')
    disk_space = subprocess.check_output(['df', '-h']).decode('utf-8')
    uptime = subprocess.check_output(['uptime']).decode('utf-8')

    return {
        'ip_address': ip_address,
        'processes': processes,
        'disk_space': disk_space,
        'uptime': uptime
    }

@app.route('/')
def info():
    return jsonify(getSystemInfo())

if __name__ == '__main__':
   app.run(host='0.0.0.0', port=5000)