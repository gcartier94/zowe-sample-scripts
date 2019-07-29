#! /bin/env node

import * as config from "config";
import { dirname, basename, extname, sep } from "path";
import { existsSync } from "fs";
import { exec } from "child_process";

const hlq: string = config.get("zos_src.dsn.hlq");
const project: string = config.get("zos_src.dsn.project");
const type: string = config.get("zos_src.dsn.type");
const dsnFile: string = hlq + '.' + project + '.' + type;

const inputPath: string = process.argv[2];
if(inputPath) uploadSource(dirname(inputPath), basename(inputPath));

function uploadSource(folder: string, file?: string) {

    if(existsSync(folder)){
        if(file){
            const filePath: string = folder + sep + file;
            const memberName: string = basename(file, extname(file));
            console.log("File path is: " + filePath);
            console.log("Member name is: " + memberName);
            console.log("Dataset to be updated is: " + dsnFile + "("+memberName+")");
            issueUploadCommand(filePath, dsnFile + "("+memberName+")");
        } else {

        }
    } else {
        console.error("Input folder: " + folder + " does not exist!");
    }
}


function issueUploadCommand(localFile: string, dataSet: string) {
    const cmd = `zowe files upload ftds "${localFile}" "${dataSet}"`;
    console.log(cmd);
    exec(cmd, (err, stdout, stderr) => {
        if (err) console.log(err)
        if (stdout) console.log(stdout.toString());
        if (stderr) console.log(stderr.toString());
    });
}
