const { exec } = require("child_process");

const HELLO_WORLD = [
  {
    H: [
      [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1],
      [4,2],
      [1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3]
    ]
  },
  {
    E: [
      [1,5], [2,5], [3,5], [4,5], [5,5], [6,5], [7,5],
      [1,6], [4,6], [7,6],
      [1,7], [4,7], [7,7]
    ]
  },
  {
    L: [
      [1,9], [2,9], [3,9], [4,9], [5,9], [6,9], [7,9],
      [7,10], [7,11]
    ]
  },
  {
    L: [
      [1,13], [2,13], [3,13], [4,13], [5,13], [6,13], [7,13],
      [7,14], [7,15]
    ]
  },
  {
    O: [
      [2,17], [3,17], [4,17], [5,17], [6,17],
      [1,18], [7,18],
      [1,19], [7,19],
      [2,20], [3,20], [4,20], [5,20], [6,20]
    ]
  },
  {
    W: [
      [1,22], [2,22], [3,22], [4,22], [5,22], [6,22], [7,22],
                                              [6,23],
                                      [5,24],
                              [4,25],
                                      [5,26],
                                              [6,27],
      [1,28], [2,28], [3,28], [4,28], [5,28], [6,28], [7,28]
    ]
  },
  {
    O: [
      [2,30], [3,30], [4,30], [5,30], [6,30],
      [1,31], [7,31],
      [1,32], [7,32],
      [2,33], [3,33], [4,33], [5,33], [6,33]
    ]
  },
  {
    R: [
      [1,35], [2,35], [3,35], [4,35], [5,35], [6,35], [7,35],
      [1,36], [4,36], [7,36],
      [1,37], [2,37], [3,37], [4,37],
      [1,38], [5,38],
      [1,39], [6,39], [7,39]
    ]
  },
  {
    L: [
      [1,41], [2,41], [3,41], [4,41], [5,41], [6,41], [7,41],
      [7,42], [7,43]
    ]
  },
  {
    D: [
      [1,45], [2,45], [3,45], [4,45], [5,45], [6,45], [7,45],
      [1,46], [7,46],
      [1,47], [7,47],
      [1,48], [2,48], [3,48], [4,48], [5,48], [6,48]
    ]
  }
];

const main = async () => {
  let commitCount = 0;
  const baseDate = new Date("2006-01-01T12:00:00Z"); // 日曜日から開始

  for (let week = 0; week < 52; week++) {
    for (let day = 0; day < 7; day++) {
      const shouldCommit = HELLO_WORLD.some((char) =>
        Object.values(char)[0].some(
          ([row, col]) => row === day + 1 && col === week + 1
        )
      );

      if (shouldCommit) {
        const date = new Date(
          baseDate.getTime() + (week * 7 + day) * 24 * 60 * 60 * 1000
        );
        await makeCommit(date, commitCount);
        commitCount++;
      }
    }
  }

  await exec2(`git push origin main`);
  console.log(`完了しました。${commitCount}回のコミットを行いました。`);
};

const makeCommit = async (date, count) => {
  await exec2(`echo ${count} > commit.txt`);
  await exec2("git add commit.txt");
  await exec2(`git commit -m 'Commit ${count}' --date="${date.toISOString()}"`);
};

const exec2 = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`実行エラー: ${err}`);
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
};

main();
