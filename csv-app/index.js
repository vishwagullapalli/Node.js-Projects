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

// const readLineAsync = (message) =>
//     new Promise((resolve) => readline.question(message, resolve));

// Promisify is used to convert traditional callback based functions into promise based functions. Example usage for readLineAsync functions

import { promisify } from "util";

const readLineAsync = promisify(readline.question).bind(readline);
(async () => {
    try {
        const name = await readLineAsync("What is your name? ");
        console.log(`Hello, ${name}!`);
    } catch (err) {
        console.log("Error:", err.message);
    } finally {
        readline.close();
    }
})();
