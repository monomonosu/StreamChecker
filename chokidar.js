import fs from "fs";
import chokidar from "chokidar";


/**
 * スタイルが削除されたら、それに関連する型定義ファイルも削除。
 */
chokidar.watch('src/app/').on('all', (event, path) => {
  if(path.endsWith('.module.scss') && event === 'unlink'){
    console.log(`🤖 Deletion of "${path}" detected.`)
    const dtsFile = `${path}.d.ts`;
    const dtsMapFile = `${path}.d.ts.map`;

    [dtsFile, dtsMapFile].forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`🗑️ Deleted: ${file}`);
      }
    });
  } 
});

console.log("✅ Monitoring the deletion of `.module.scss` ...");
