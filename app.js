const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = []


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
            teamMembers.push(employee);
            return inquirer.prompt(continueQuest)
        })
        .then(function (answers) {
            if (answers.continue) {
                return prompt();
            }
            var html = render(teamMembers);
            fs.writeFileSync(outputPath, html, "UTF-8")
        })
        
}

prompt()


// inquirer.prompt(questions)

// if(questions.choices == "Manager") {

// }



// The first class is an Employee parent class with the following properties and methods:

// name
// id
// email
// getName()
// getId()
// getEmail()
// getRole() // Returns 'Employee'
// The other three classes will extend Employee.

// In addition to Employee's properties and methods, Manager will also have:

// officeNumber

// getRole() // Overridden to return 'Manager'

// In addition to Employee's properties and methods, Engineer will also have:

// github // GitHub username

// getGithub()

// getRole() // Overridden to return 'Engineer'

// In addition to Employee's properties and methods, Intern will also have:

// school

// getSchool()

// getRole() // Overridden to return 'Intern'

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```





