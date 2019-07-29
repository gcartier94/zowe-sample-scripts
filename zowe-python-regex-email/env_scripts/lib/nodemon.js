#! /bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const child_process_1 = require("child_process");
const nodemon = require("nodemon");
nodemon({
    ext: "jcl rex txt",
    watch: "zos_src",
    exec: "echo Watching for changes"
});
nodemon.on('restart', function () {
    const cmd = `zowe files ul ftds "zos_src\\MYREXX.rex" "A118151.MEETUP.REXX(MYREXX)"`
    child_process_1.exec(cmd, (err, stdout, stderr) => {
        if (err)
            console.log(err);
        if (stdout)
            console.log(stdout.toString());
        if (stderr)
            console.log(stderr.toString());
    });
});