var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('console.table');
var db = require(".");
const { Console } = require("console");

var connection = mysql.createConnection({
  host: "localhost",

  // PORT
  port: 8889,

  // USERNAME
  user: "root",

  //PASSWORD
  password: "root",
  database: "trackerDB"

});


//CONNECTION MYSQL
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startCommand();
});

//console.log("Diogo Candido");
// Command-line applicaton 
function startCommand() {
    inquirer.prompt ({
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: ["View All Departments",
                "View All Employees",
                "View All Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Delete Employee",
                "Exit"
              ]
    })
    .then(function(answer) {
        switch (answer.choice) {
            case "View All Departments":
             checkDeparts();
            break;

            case "View All Employees":
              checkEmpl();
            break;

            case "View All Roles":
              checkRoles();
            break;

            case "Add Employee":
              addEmpl();
            break;

            case "Add Department":
              addDept();
            break;

            case "Add Role":
              addRole();
            break;

            case "Update Employee Role":
              updateEmplRole();
            break;

            case "Delete Employee":
              deleteEmpl();
            break;

            case "Exit":
              connection.end();
            break;
        }
    })

}

console.log("Command-Line");

//"View All Departments"
function checkDeparts() {
  query = "SELECT employee.first_name, employee.last_name, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id";
  connection.query(query, function (err, res) { 
    if (err) throw err;

  console.table(res);
  startCommand ();

  })
}

//"View All Employees"
function checkEmpl() {
  query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(employee.first_name, ' ' ,employee.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id";
  connection.query(query, function (err, res) { 
    if (err) throw err;

  console.table(res);
  startCommand ();

  })
}

//"View All Roles"
function checkRoles() {
  query = "SELECT employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id";
  connection.query(query, function (err, res) { 
    if (err) throw err;

   console.table(res);
  startCommand ();

  })
}

//"Arrays"
var roleTB = [];
function selRoleTB() {
  connection.query("SELECT* FROM trackerDB.role WHERE title = ?",
  function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleTB.push(res[i].title);
    }
  })
  return roleTB; 
}

var managerTB = [];
function selManagerTB() {
  connection.query("SELECT first_name, last_name FROM trackerDB.employee WHERE manager_id IS NULL",
  function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managerTB.push(res[i].title);
    }
  })
  return managerTB; 
}

// //"Add Employee"
// function addEmpl() {
//     inquirer.prompt([
//       {
//         type: "input",
//         name: "firstName",
//         message: "Insert the first name of the employee"
//       },
//       {
//         type: "input",
//         name: "lastName",
//         message: "Insert the last name"
//       },
//       {
//         type: "input",
//         name: "roleId",
//         message: "Insert the role id number"
//         choice: selRoleTB()
//       },
//       {
//         type: "input",
//         name: "managerId",
//         message: "Insert the  manager id number"
//         choice: selManagerTB()
//       },
      
//     ])
//     .then(function (answer) {
//       var roleID = selRoleTB().indexOf(answer.roleId) + 1
//       var managerID = selManagerTB().indexOf(answer.managerId) + 1
//       var query = connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
//       {
//        answer.firstName, answer.lastName, answer.roleID, answer.managerID
//       };
      
//       function(err) {
//         if (err) throw err
//         console.table(answer);
//         startCommand();
//       }
//     })
// }

//"Delete Employee":
function deleteEmpl() {
  query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(employee.first_name, ' ' ,employee.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id";
  connection.query(query, function (err, res) { 
    if (err) throw err;
    inquirer.prompt([
      {
    type: "input",
    name: "delEmpl",
    message: "Insert the role id of the employee to remove"
  },
  ])

  .then(function(answer) {
    connection.query("DELETE FROM employee WHERE role_id = ?", 
      {
         id: answer.delEmpl
      })
     
      console.table(res)
    startCommand ();

    })
  })
}

              
// "Add Department":
//              addDept();
//          "Add Role":
//               addRole();
//          "Update Employee Role":
//               updateEmplRole();
//    

            