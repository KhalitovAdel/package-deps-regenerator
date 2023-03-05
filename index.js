#!/usr/bin/env node
const { join } = require('path');

const packageLock = require(join(process.cwd(), 'package-lock.json'));

const project = packageLock.packages[""];

const dependencies = packageLock.dependencies
const projectDependencies = Object.keys(project.dependencies);
const projectDevDependencies = Object.keys(project.devDependencies);

function genScript(projectDep) {
    return projectDep.map(d => {
        const detail = dependencies[d];
        return `${d}@${detail.version}`;
    }).join(' ');
}

console.log(`npm i --legacy-peer-deps ${genScript(projectDependencies)}`);
console.log(` `);
console.log(`npm i -D --legacy-peer-deps ${genScript(projectDevDependencies)}`);