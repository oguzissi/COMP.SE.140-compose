import express from "express";
import axios from "axios";
import ip from "ip";
import { execSync } from "child_process";

const app = express();
const port = 3000;

function getSystemInfo() {
    const ip_address = ip.address();
    const processes = execSync('ps').toString(); 
    const disk_space = execSync('df -h').toString(); 
    const uptime = execSync('uptime').toString(); 

    return {
        ip_address: ip_address,
        processes: processes,
        disk_space: disk_space,
        uptime: uptime,
    }
}

app.get('/', async (req, res) => {
    const server1Response = getSystemInfo();
    const server2Response = await axios.get('http://server2:5000/');

    res.send({
        server1: server1Response,
        server2: server2Response.data,
    });
});

app.listen(port);