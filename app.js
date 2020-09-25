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
  query = "SELECT * FROM trackerDB.department";
  connection.query(query, function (err, res) { 
    if (err) throw err;

  console.table(res);
  startCommand ();

  })
}

//"View All Employees" 
function checkEmpl() {
  query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
  connection.query(query, function (err, res) { 
    if (err) throw err;

  console.table(res);
  startCommand ();

  })
}

//"View All Roles"
function checkRoles() {
  query = "SELECT * FROM trackerDB.role";
  connection.query(query, function (err, res) { 
    if (err) throw err;

   console.table(res);
  startCommand ();

  })
}

// Add Employee
function addEmpl() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Insert the first name of the employee"
    },
    {
      type: "input",
      name: "lastName",
      message: "Insert the last name"
    },
    {
      type: "input",
      name: "managerId",
      message: "Insert the manager id number"
    },
    {
      type: "input",
      name: "roleId",
      message: "Insert the role id number"
    },
  ])
  .then(function(val) {
    var query = connection.query("INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)",
      [val.firstName, val.lastName, val.managerId, val.roleId],
      function(err, res) {
      if (err) throw err
      console.table(res)
      startCommand();
    })
  })
}

// "Add Department":
function addDept() {
      inquirer.prompt([
        {
          type: "input",
          name: "department",
          message: "Insert the name of the department"
        },
    ])
    .then(function(answer) {
      connection.query("INSERT INTO department (name) VALUE (?)", 
      [answer.department], 
      function (err, res) {
        if (err) throw err
        console.table(res);
        startCommand();
      })
    })
}            

// ADD ROLE 
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "Insert the name of the role"
    },
    {
      type: "input",
      name: "salary",
      message: "Insert the salary"
    },
    {
      type: "input",
      name: "deptId",
      message: "Insert the department id number"
    },
  ])
  .then(function(answer) {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    [answer.role, answer.salary, answer.deptId],
      function(err, res) {
      if (err) throw err
      console.table(res)
      startCommand();
    })
  })
}


// Update Employee Role" ================================== // =========== Add role
function updateEmplRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "upName",
      message: "Insert the new last name of the employee"
    },
    {
      type: "input",
      name: "upRoleId",
      message: "Insert the role id of the employee"
    },

  ])
  .then(function(val) {
    var query = connection.query("UPDATE employee SET last_name= ? WHERE id= ?", 
      [val.upName, val.upRoleId],
      function(err, res) {
      if (err) throw err
      console.table(res)
      startCommand();
    })
  })
}

//"Delete Employee" ========== terminal runs but not delete=============
function deleteEmpl() {
  query = "SELECT * FROM employee";
    connection.query(query, function (err, res) { 
    if (err) throw err;
    inquirer.prompt([
      {
    type: "input",
    name: "delEmpl",
    message: "Insert the ID of the employee to remove"
  },
  ])

  .then(function(answer) {
    console.log(answer);
    connection.query("DELETE FROM employee WHERE id = ?", 
      {
         id: answer.delEmpl
      });
     
    console.table(res)
    startCommand ();

    })
  })
}

startCommand ();