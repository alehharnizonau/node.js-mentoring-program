const repl = require("repl");

const local = repl.start("$ ");

local.on("exit", () => {
    console.log("exiting repl");
    process.exit();
});

const getNumber = require("./index");

local.context.getRandomNumber = getNumber.getRandomNumber;
