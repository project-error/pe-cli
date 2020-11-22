import inquirer from "inquirer";

const promptResource = () => inquirer.prompt([
  {
    name: 'val',
    type: 'input',
    message: 'Type in the name of the resource:',
    validate: function(value) {
      if (value.length) {
        return true
      } else {
        return 'Please fill out the resource name'
      }
    }
  }
])

export default promptResource