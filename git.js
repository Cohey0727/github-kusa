const { exec } = require("child_process");

const main = async () => {
  let index = 0;
  // 2017年1月1日
  const baseDate = 946652400;
  for (const a of [...Array(183).keys()]) {
    await exec2(`echo ${index} > index.txt`);
    await exec2("git add .");
    const date = new Date(baseDate + index * 1000 * 60 * 60 * 24 * 2);
    await exec2(`git commit -m 'add ' --date="${date.toISOString()}"`);
    index++;
  }
  await exec2(`git push`);
};

const exec2 = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
};
main();
