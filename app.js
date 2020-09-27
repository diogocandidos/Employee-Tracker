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

console.log("Diogo Candido");
// Command-line applicaton 
function startCommand() {
    inquirer.prompt ({
      type: "rawlist",
      message: "What would you like to do?",
      name: "choice",
      choices: ["View Employees by Department",
                "View All Departments",
                "View All Employees",
                "View All Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee",
                "Delete Employee",
                "Exit"
              ]
    })
    .then(function(answer) {
        switch (answer.choice) {
            case "View Employees by Department":
              eeByDepto();
            break;

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

            case "Update Employee":
              updateEmpl();
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


// VIEW EMPLOYEE BY DEPTO 
function eeByDepto() {
  var dptName = "SELECT name, id FROM trackerDB.department";
  connection.query(dptName, function (err, results) {
      if (err) throw err
 
      inquirer.prompt (
        {
          type: "rawlist",
          message: "Select the department",
          name: "depts",
          choices: function() {
          var deptoOpt = results.map(option => option.name)
          if (err) throw err
          return deptoOpt;
          }   
        }
  )
  .then(function(answer) {
       var deptoSel;
       for (var d = 0; d < results.length; d++) {
         console.log(results[d]);

         if (results[d].name === answer.depts) {
           deptoSel = results[d];
         }
       }
 console.log(deptoSel);

   connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager FROM employee LEFT JOIN role ON  role.id = employee.role_id LEFT JOIN employee manager ON manager.id = employee.manager_id LEFT JOIN department ON department.id = role.department_id WHERE department_id= ?", [deptoSel.id], 
   function (err, res) {
    if (err) throw err     
    console.log(answer)
    console.table(res)
    startCommand();

  })

  })

  })
}

// VIEW ALL DEPTOS
function checkDeparts() {
  query = "SELECT * FROM trackerDB.department";
  connection.query(query, function (err, res) { 
    if (err) throw err;

  console.table(res);
  startCommand ();

  })
}

// VIEW ALL EMPLOYEES 
function checkEmpl() {
  query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
  connection.query(query, function (err, res) { 
    if (err) throw err;

  console.table(res);
  startCommand ();

  })
}

// VIEW ALL ROLES
function checkRoles() {
  query = "SELECT * FROM trackerDB.role";
  connection.query(query, function (err, res) { 
    if (err) throw err;

   console.table(res);
  startCommand ();

  })
}

// ADD EMPLOYEE
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
      message: "Insert the manager ID number"
    },
    {
      type: "input",
      name: "roleId",
      message: "Insert the role ID number"
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

// ADD DEPTO
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
      message: "Insert the department ID number"
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

// UPDATE EMPLOYEE 
function updateEmpl() {
  inquirer.prompt([
    {
      type: "input",
      name: "upRoleId",
      message: "Insert the ID of the employee"
    },
          {
        type: "input",
        name: "newRole",
        message: "Insert the NEW ROLE"
    },
      ])
  .then(function(val) {
    var query = connection.query("UPDATE employee SET employee.role_id= ?  WHERE id= ?", 
      [val.upRoleId,val.newRole],
      function(err, res) {
      if (err) throw err
      console.table(res)
      startCommand();
    })
  })
}

// DELETE EMPLOYEE
function deleteEmpl() {
	connection.query("SELECT * FROM employee", function (error, result) {
		if (error) throw error;
		console.table(result);
		inquirer.prompt([
			{
				type: "input",
				name: "delEmpl",
				message: "Insert the ID of the employee to remove"
			}
		]).then(function (answer) {
			connection.query("DELETE FROM employee WHERE id = ?", [answer.delEmpl], function () {
				connection.query("SELECT * FROM employee", function (error, result) {
					console.table(result);
					startCommand();
				});
			});
		});
	});
}
