const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');

const getSystemProcess = (system) => {
    switch (system) {
        case 'win32':
            return 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"'
        case 'linux':
        case 'darwin':
            return 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1'
        default:
            throw new Error('Unsupported operating system');
    }
}

const appendFile = async (path, data) => {
    try {
        await fs.promises.appendFile(path, data);
    } catch (e) {
        console.error("Error writing to the file:", e);
    }
};

const main = () => {
    const system = os.platform();
    const refreshRate = 100;
    const filePath = "activityMonitor.log";
    const fileWritingFrequency = 60;
    try {
        let lastWritingTime = 0;
        setInterval(() => {
            exec(getSystemProcess(system), (error, stdout) => {
                if (error !== null) {
                    console.error(`error: ${error}`);
                }

                const unixTime = Math.floor(new Date() / 1000);
                const processInfo = stdout.trim();
                const message = `${unixTime} : ${processInfo}\n`;

                if (unixTime - lastWritingTime >= fileWritingFrequency) {
                    appendFile(filePath, message);
                    lastWritingTime = unixTime;
                }

                process.stdout.write(`${processInfo}\r`);
            })
        }, refreshRate);

    } catch (e) {
        console.error(e);
    }
}

main();
