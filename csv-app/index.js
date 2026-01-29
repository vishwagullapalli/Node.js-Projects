import { writeFileSync } from "fs";
import { createInterface } from "readline";

const content = "Test content!";

try {
    writeFileSync("./test.txt", content);
    console.log("Success!");
} catch (err) {
    console.log(err);
}

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const readLineAsync = (message) =>
    new Promise((resolve) => readline.question(message, resolve));
