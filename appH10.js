const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const render = require("./lib/generateHtml");

var employeeArray = [];

function CreateManager() {
    const promptQuestion = [
        {
            type: "input",
            name: "name",
            message: "What is your name? "
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID? "
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address? "
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number? "
        }
    ];       
    inquirer.prompt(promptQuestion).then(function (response) {
        console.log(response);
        const manager = new Manager(response.name,response.id,response.email,response.officeNumber);
        employeeArray.push(manager);
        CreateEmployee();
    });
}

function CreateEmployee(){
    const addMember = [
        {
            type: "list",
            name: "employeeRole",
            message: "Add a member in the team ",
            choices: ["Engineer", "Intern", "NONE"]
        }
    ];
    
    inquirer.prompt(addMember).then(function (response) {
        console.log(response);
        if (response.employeeRole == "Engineer") {
           CreateEngineer();
        } else if (response.employeeRole == "Intern") {
           CreateIntern();
        } else {
            console.log("HTML file created");
           
  
            render(employeeArray);
        }
    });
}

function CreateEngineer(){
    const promptQuestion = [
        {
            type: "input",
            name: "name",
            message: "What is your name? "
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID? "
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address? "
        },
        {
            type: "input",
            name: "github",
            message: "What is your github profile? "
        }
    ];       
    inquirer.prompt(promptQuestion).then(function (response) {
        console.log(response);
        const engineer = new Engineer(response.name,response.id,response.email,response.github);
         employeeArray.push(engineer);
         CreateEmployee();
    });
}

function CreateIntern(){
    const promptQuestion = [
        {
            type: "input",
            name: "name",
            message: "What is your name? "
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID? "
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address? "
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of your school? "
        }
    ];       

    inquirer.prompt(promptQuestion).then(function (response) {
        console.log(response);
        const intern = new Intern(response.name,response.id,response.email,response.school);
         employeeArray.push(intern);
         CreateEmployee();
    });
}

CreateManager();

