import express from "express";
import ip from "ip";
import { execSync } from "child_process";

const app = express();
const port = 8199;

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

app.get('/', (req, res) => {
    const ownResponse = getSystemInfo();

    res.send({
        service1: ownResponse
    });
});

app.listen(port, () => {
    console.log(`Server1 is running on port ${port}`);
});