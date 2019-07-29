#!/bin/env node

import * as config from "config";
import * as mustache from "mustache";
import * as fs from "fs";
import { dirname, basename, extname } from "path";

const templatesFolder: string = config.get("templates") ;
const renderedFolder: string = config.get("zos_src.local.folder");

fs.readdirSync(templatesFolder).forEach(fileName => {
    console.log("Rendering: " + fileName);
    const templateFile: string = fs.readFileSync(templatesFolder + fileName).toString()
    const renderedFile = mustache.render(templateFile, config);
    if (!fs.existsSync(renderedFolder)) fs.mkdirSync(renderedFolder);
    fs.writeFileSync(renderedFolder + fileName, renderedFile);
    console.log("Render complete for " + fileName);
});