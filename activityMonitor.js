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

const main = () => {
    const system = os.platform();
    const refreshRate = 100;
    try {
        setInterval(() => {
            exec(getSystemProcess(system), (error, stdout) => {
                if (error !== null) {
                    console.error(`error: ${error}`);
                }

                process.stdout.write(`${stdout.trim()}\r`);
            })
        }, refreshRate);

    } catch (e) {
        console.error(e);
    }
}

main();



