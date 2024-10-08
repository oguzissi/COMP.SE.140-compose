import express from "express";
import ip from "ip";
import { execSync } from "child_process";

const app = express();
const port = 8199;

function runScripts() {
    const ip_address = ip.address();
    const running_processes = execSync('ps').toString(); 
    const disk_space = execSync('df -h').toString(); 
    const time_since_last_reboot = execSync('uptime').toString(); 

    return {
        ip_address: ip_address,
        running_processes: running_processes,
        disk_space: disk_space,
        time_since_last_reboot: time_since_last_reboot,
    }
}

app.get('/', (req, res) => {
    const ownResponse = runScripts();

    res.send({
        service1: ownResponse
    });
});

app.listen(port, () => {
    console.log(`Server1 is running on port ${port}`);
});