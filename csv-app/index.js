import prompt from "prompt";
import { createObjectCsvWriter } from "csv-writer";

prompt.start();
prompt.message = "";

const csvWriter = createObjectCsvWriter({
    path: "./contacts.csv",
    append: true,
    header: [
        { id: "name", title: "NAME" },
        { id: "number", title: "NUMBER" },
        { id: "email", title: "EMAIL" },
    ],
});

class Person {
    constructor(name = "", number = "", email = "") {
        this.name = name;
        this.number = number;
        this.email = email;
    }
    async saveToCSV() {
        try {
            const { name, number, email } = this;
            await csvWriter.writeRecords([{ name, number, email }]);
            console.log(`${this.name} Saved!`);
        } catch (err) {
            console.log("Error saving contact:", err);
        }
    }
}

const startApp = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    const promptName = await prompt.get([
        { name: "name", description: "Contact Name" },
    ]);

    const name = promptName.name;
    let number;
    let email;

    while (true) {
        const promptNumber = await prompt.get([
            { name: "number", description: "Contact Number" },
        ]);
        number = promptNumber.number;
        if (phoneRegex.test(number)) {
            break;
        }
        console.log("Invalid phone number format. Try again!");
    }

    while (true) {
        const promptEmail = await prompt.get([
            { name: "email", description: "Contact Email" },
        ]);
        email = promptEmail.email;
        if (emailRegex.test(email)) {
            break;
        }
        console.log("Invalid email format. Try again!");
    }

    const person = new Person(name, number, email);
    await person.saveToCSV();

    const { again } = await prompt.get([
        { name: "again", description: "Continue? [y to continue]" },
    ]);

    if (again.toLowerCase() === "y") await startApp();
};

startApp();
