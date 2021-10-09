class QuestionManager {
  constructor() {
    (this.choiceList = [
      "VIEW DEPARTMENTS", //0
      "VIEW ROLES",
      "VIEW EMPLOYEES",
      "ADD DEPARTMENT",
      "ADD ROLE",
      "ADD EMPLOYEE",
      "UPDATE EMPLOYEE ROLE",
      "EXIT",
    ]),
      (this.questions = [
        {
          type: "list",
          name: "task",
          message: "Select an Action",
          choices: this.choiceList,
        },
      ]),
      (this.deptAddQuestions = [
        {
          type: "string",
          name: "name",
          message: "Enter new department's name",
        },
      ]),
      (this.roleAddQuestions = [
        {
          type: "string",
          name: "title",
          message: "Enter new role's title",
        },
        {
          type: "number",
          name: "salary",
          message: "Enter role's salary",
        },
        {
          type: "number",
          name: "department_id",
          message: "Enter ID of department Role belongs to",
        },
      ]),
      (this.employeeAddQuestions = [
        {
          type: "string",
          name: "first_name",
          message: "Enter new employee's first name",
        },
        {
          type: "string",
          name: "last_name",
          message: "Enter new employee's last name",
        },
        {
          type: "number",
          name: "role_id",
          message: "Enter associated role's ID",
          validate: (entry) => {
            if (!isNaN(entry)) return true;
            return "Entry must be a valid number";
          },
        },
        {
          type: "number",
          name: "manager_id",
          message: "Enter manager's ID (skip if not applicable)",
          default: null,
        },
      ]),
      (this.updateRoleQuestions = [
        {
          type: "number",
          name: "employee_id",
          message: "Enter id of employee to be updated",
          validate: (entry) => {
            if (!isNaN(entry)) return true;
            return "Entry must be a valid number";
          },
        },
        {
          type: "number",
          name: "new_role_id",
          message: "Enter id of new role",
          validate: (entry) => {
            if (!isNaN(entry)) return true;
            return "Entry must be a valid number";
          },
        },
      ]);
  }
}

module.exports = QuestionManager;
