import child_process, { exec } from "child_process";
import * as path from "path";
import ffmpeg from "ffmpeg-static";
import { resolve } from "dns";
import { rejects } from "assert";

export default class AmrToMp3 {
  static async Convert(filePath: string, outputDir: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const baseName = path.basename(filePath);
      const etc = baseName.split(".").pop() as string;
      const fileName = baseName.replace(`.${etc}`, "");
      if (etc.toLowerCase() != "amr") {
        reject("input must be amr file");
      }
      const cmdStr = `${
        ffmpeg.path
      } -y -i ${filePath} ${outputDir}/${fileName}.mp3`;
      exec(cmdStr, (err, stdout, stderr) => {
        if (err) {
          reject(`error: ${stderr}`);
        } else {
          resolve(`${outputDir}/${fileName}.mp3`);
        }
      });
    });
  }
}
