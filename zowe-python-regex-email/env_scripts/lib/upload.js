#! /bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const path_1 = require("path");
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const hlq = config.get("zos_src.dsn.hlq");
const project = config.get("zos_src.dsn.project");
const type = config.get("zos_src.dsn.type");
const dsnFile = hlq + '.' + project + '.' + type;
const inputPath = process.argv[2];
if (inputPath)
    uploadSource(path_1.dirname(inputPath), path_1.basename(inputPath));
function uploadSource(folder, file) {
    if (fs_1.existsSync(folder)) {
        if (file) {
            const filePath = folder + path_1.sep + file;
            const memberName = path_1.basename(file, path_1.extname(file));
            console.log("File path is: " + filePath);
            console.log("Member name is: " + memberName);
            console.log("Dataset to be updated is: " + dsnFile + "(" + memberName + ")");
            issueUploadCommand(filePath, dsnFile + "(" + memberName + ")");
        }
        else {
        }
    }
    else {
        console.error("Input folder: " + folder + " does not exist!");
    }
}
function issueUploadCommand(localFile, dataSet) {
    const cmd = `zowe files upload ftds "${localFile}" "${dataSet}"`;
    console.log(cmd);
    child_process_1.exec(cmd, (err, stdout, stderr) => {
        if (err)
            console.log(err);
        if (stdout)
            console.log(stdout.toString());
        if (stderr)
            console.log(stderr.toString());
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VwbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxpQ0FBaUM7QUFDakMsK0JBQXVEO0FBQ3ZELDJCQUFnQztBQUNoQyxpREFBcUM7QUFFckMsTUFBTSxHQUFHLEdBQVcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sT0FBTyxHQUFXLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUMxRCxNQUFNLElBQUksR0FBVyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDcEQsTUFBTSxPQUFPLEdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztBQUV6RCxNQUFNLFNBQVMsR0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFDLElBQUcsU0FBUztJQUFFLFlBQVksQ0FBQyxjQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsZUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFFcEUsU0FBUyxZQUFZLENBQUMsTUFBYyxFQUFFLElBQWE7SUFFL0MsSUFBRyxlQUFVLENBQUMsTUFBTSxDQUFDLEVBQUM7UUFDbEIsSUFBRyxJQUFJLEVBQUM7WUFDSixNQUFNLFFBQVEsR0FBVyxNQUFNLEdBQUcsVUFBRyxHQUFHLElBQUksQ0FBQztZQUM3QyxNQUFNLFVBQVUsR0FBVyxlQUFRLENBQUMsSUFBSSxFQUFFLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsQ0FBQztZQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUMsVUFBVSxHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pFLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxPQUFPLEdBQUcsR0FBRyxHQUFDLFVBQVUsR0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5RDthQUFNO1NBRU47S0FDSjtTQUFNO1FBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztLQUNqRTtBQUNMLENBQUM7QUFHRCxTQUFTLGtCQUFrQixDQUFDLFNBQWlCLEVBQUUsT0FBZTtJQUMxRCxNQUFNLEdBQUcsR0FBRywyQkFBMkIsU0FBUyxNQUFNLE9BQU8sR0FBRyxDQUFDO0lBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsb0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzlCLElBQUksR0FBRztZQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDekIsSUFBSSxNQUFNO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLE1BQU07WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9