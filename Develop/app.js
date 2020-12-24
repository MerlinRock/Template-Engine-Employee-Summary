const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
console.log(outputPath +"Here!")

const render = require("./lib/htmlRenderer");

const employees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employeeQuest = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email?"
    },
]

const roleQuest = [
    {
        type: "list",
        name: "role",
        message: "What kind of employee would you like to add?",
        choices: ["Intern", "Manager", "Engineer"]
    },
]

const internQuest = [
    {
        type: "input",
        name: "school",
        message: "What school did you attend?",
    },
].concat(employeeQuest);

const engineerQuest = [
    {
        name: "github",
        message: "Please provide your GitHub username: ",
    },
].concat(employeeQuest);

const managerQuest = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
    },
].concat(employeeQuest);

const continueQuest = [
    {
        type: "confirm",
        name: "continue",
        message: "Would you like to continue?",
    },
]

function prompt() {
    var role;
    return inquirer.prompt(roleQuest)
        .then(function (answers) {
            role = answers.role
            switch (answers.role) {
                case "Intern":
                    return inquirer.prompt(internQuest);
                case "Engineer":
                    return inquirer.prompt(engineerQuest);
                case "Manager":
                    return inquirer.prompt(managerQuest);
            }
        })
        .then(function (answers) {
            var employee;
            switch (role) {
                case "Intern":
                    employee = new Intern(answers.name, answers.id, answers.email, answers.school)
                    break;
                case "Engineer":
                    employee = new Engineer(answers.name, answers.id, answers.email, answers.github)
                    break
                case "Manager":
                    employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            }
            employees.push(employee);
            return inquirer.prompt(continueQuest)
        })
        .then(function (answers) {
            if (answers.continue) {
                return prompt();
            }
            var html = render(employees);
            console.log(employees)
            fs.writeFileSync(outputPath, html, "UTF-8")
        })
        
}

prompt()