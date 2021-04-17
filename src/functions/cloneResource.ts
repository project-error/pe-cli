import axios from "axios"
import shell from 'shelljs';
import ora from 'ora';

export const cloneResource = async (resourceName: string, url: string): Promise<void> => {
  try {
    const query = await axios.get(url)
    if (query.status !== 200) {
      console.log('URL not found')
      return
    }
  } catch (e) {
    console.error('Could not validate URL')
    return
  }

  try {
    if (
      shell.exec(
        `git clone ${url} ${resourceName}`
      ).code !== 0
    ) {
      shell.exit(1);
    }
  } catch (error) {
    console.log(error);
  }

  const spinner = ora("Installing packages...").start();

  spinner.succeed("Successfully added default packages");
  try {
    if (shell.exec(`cd ${resourceName} && yarn --silent && rm -rf .git && rm -rf .github`).code !== 0) {
      shell.exit(1);
    }
  } catch (error) {
    console.log(error);
  }
}