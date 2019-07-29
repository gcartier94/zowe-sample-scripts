#! /bin/env node
// Script used to watch the source folder and upload the changes to z/OS automatically

import { basename, dirname, sep } from "path";
import { exec } from "child_process";
import { SSL_OP_EPHEMERAL_RSA } from "constants";
const nodemon = require("nodemon");

nodemon({
    ext: "jcl rex txt",
    watch: "zos_src",
    exec: "echo Watching for changes"
});

nodemon.on('restart', function (filePaths: string[]) {
    filePaths.forEach((filePath) => {
        const file = basename(filePath);
        const dir = dirname(filePath).split(sep);
        const folder = dir.pop();
        const project = dir.pop();
        const cmd = `npm run upload ${project}${sep}${folder}${sep}${file}`;
        console.log(cmd);
        sleep(300);
        exec(cmd, (err, stdout, stderr) => {
            if (err) console.log(err)
            if (stdout) console.log(stdout.toString());
            if (stderr) console.log(stderr.toString());
        });
    });
});

// Simple sleep function to avoid many Datasets being uploaded to z/OS at once
function sleep(milliseconds: number) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }