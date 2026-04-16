#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";

const BOILERPLATE_REPO_URL = "https://github.com/bhavyajustchill/node-express-ts-modular-api.git";

function printLogo() {
  console.log(
    chalk.blue("______ _                               ___           _   _____ _     _ _ _ ")
  );
  console.log(
    chalk.blue("| ___ \\ |                             |_  |         | | /  __ \\ |   (_) | |")
  );
  console.log(
    chalk.blue("| |_/ / |__   __ ___   ___   _  __ _    | |_   _ ___| |_| /  \\/ |__  _| | |")
  );
  console.log(
    chalk.blue("| ___ \\ '_ \\ / _` \\ \\ / / | | |/ _` |   | | | | / __| __| |   | '_ \\| | | |")
  );
  console.log(
    chalk.blue("| |_/ / | | | (_| |\\ V /| |_| | (_| /\\__/ / |_| \\__ \\ |_| \\__/\\ | | | | | |")
  );
  console.log(
    chalk.blue(
      "\\____/|_| |_|\\__,_| \\_/  \\__, |\\__,_\\____/ \\__,_|___/\\__|\\____/_| |_|_|_|_|"
    )
  );
  console.log(
    chalk.blue("                          __/ |                                            ")
  );
  console.log(
    chalk.blue("                         |___/                                             ")
  );
}

async function createProject(projectName) {
  const targetPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetPath)) {
    console.log(chalk.red.bold(`Error: Directory "${projectName}" already exists.`));
    process.exit(1);
  }

  try {
    const cloneSpinner = ora(chalk.cyan("Cloning the TypeScript Express API starter...")).start();
    execSync(`git clone ${BOILERPLATE_REPO_URL} "${targetPath}"`, { stdio: "inherit" });
    cloneSpinner.succeed(chalk.green("Cloned repository successfully."));

    const removeGitSpinner = ora(chalk.cyan("Removing existing .git folder...")).start();
    const gitPath = path.join(targetPath, ".git");
    if (fs.existsSync(gitPath)) {
      fs.rmSync(gitPath, { recursive: true, force: true });
    }
    removeGitSpinner.succeed(chalk.green(".git folder removed."));

    const gitInitSpinner = ora(chalk.cyan("Initializing a new Git repository...")).start();
    execSync(`cd ${targetPath} && git init`, { stdio: "inherit" });
    gitInitSpinner.succeed(chalk.green("Initialized new Git repository."));

    const installSpinner = ora(chalk.cyan("Installing dependencies...")).start();
    execSync(`cd ${targetPath} && npm install`, { stdio: "inherit" });
    installSpinner.succeed(chalk.green("Dependencies installed."));

    console.log(chalk.bold.green(`\nProject "${projectName}" created successfully!\n`));
  } catch (error) {
    console.log(chalk.red.bold(`\nError: ${error.message}\n`));
    process.exit(1);
  }
}

const projectName = process.argv[2];

if (!projectName) {
  console.log(chalk.red("Please specify a project name."));
  console.log(chalk.cyan("Usage: ") + chalk.green("npx create-bhavya-ts-api <project-name>"));
  process.exit(1);
}

printLogo();
createProject(projectName);
