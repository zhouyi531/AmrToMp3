export * from 'child_process';
import { exec } from 'child_process';
import ffmpeg from 'ffmpeg-static';
import fs from 'fs';
import * as path from 'path';

export class AmrToMp3 {
  public static async Convert(filePath: string, outputDir: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const baseName = path.basename(filePath);
      const etc = baseName.split('.').pop() as string;
      const fileName = baseName.replace(`.${etc}`, '');
      if (etc.toLowerCase() != 'amr') {
        reject('input must be amr file');
      }
      const cmdStr = `${ffmpeg.path} -y -i ${filePath} -q:a 330 ${outputDir}/${fileName}.mp3`;
      exec(cmdStr, (err, stdout, stderr) => {
        if (err) {
          reject(`error: ${stderr}`);
        } else {
          console.log(`${fileName}.mp3 size:`, fs.statSync(`${outputDir}/${fileName}.mp3`).size);
          resolve(`${outputDir}/${fileName}.mp3`);
        }
      });
    });
  }
}
