const ConsoleTable = require("console.table");
const connection = require("../config/connection");

const queryList = {
  selectQueries: {
    departmentQuery: "SELECT * FROM departments",
    roleQuery: `SELECT role_id, title, salary, name FROM company_db.roles
INNER JOIN company_db.departments
ON company_db.roles.department_id = company_db.departments.department_id;`,
    employeeQuery: `SELECT
    e.employee_id,
    e.first_name,
    e.last_name,
    r.title,
    CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
FROM
    employees e
LEFT JOIN employees m ON 
    m.employee_id = e.manager_id
LEFT JOIN roles r ON
    r.role_id = e.role_id
ORDER BY 
    e.manager_id;
    `,
  },
};

class DataManager {
  constructor() {}

  async getDepartments() {
    try {
      return await this.executeSql(queryList.selectQueries.departmentQuery);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRoles() {
    try {
      return await this.executeSql(queryList.selectQueries.roleQuery);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getEmployees() {
    try {
      return await this.executeSql(queryList.selectQueries.employeeQuery);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addDepartment(name) {
    try {
      const query = `INSERT INTO departments (name) values ('${name}')`;
      await this.executeSql(query);
      return "Department Added!";
    } catch (error) {
      throw new Error(error);
    }
  }

  async addRole(title, salary, department_id) {
    try {
      const query = `INSERT INTO roles (title, salary, department_id) values ('${title}', '${salary}', '${department_id}')`;
      await this.executeSql(query);
      return "Role Updated!";
    } catch (error) {
      throw new Error(error);
    }
  }

  async addEmployee(first_name, last_name, role_id, manager_id) {
    try {
      const query = manager_id
        ? `INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('${first_name}', '${last_name}', '${role_id}', '${manager_id}')`
        : `INSERT INTO employees (first_name, last_name, role_id) values ('${first_name}', '${last_name}', '${role_id}')`;
      this.executeSql(query);
      return "Employee Added!";
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateEmployeeRole(employee_id, new_role_id) {
    try {
      const query = `UPDATE employees
    SET 
    role_id = ${new_role_id}
    WHERE
    employee_id = ${employee_id};`;
      await this.executeSql(query);
      return "Employee role updated!";
    } catch (error) {
      throw new Error(error);
    }
  }

  async executeSql(command) {
    try {
      return await new Promise((resolve, reject) => {
        connection.execute(command, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = DataManager;
