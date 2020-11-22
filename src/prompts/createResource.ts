import inquirer from "inquirer";

const createResource = () => inquirer.prompt([
  {
    name: 'resource',
    type: 'input',
    message: 'Type in the name of the resource',
    validate: function(value) {
      if (value.length) {
        return true
      } else {
        return 'Please fill out the resource name'
      }
    }
  }
])

export default createResource