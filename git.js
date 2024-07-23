const { exec } = require("child_process");

const HELLO_WORLD = [
  {
    H: [
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
      [6, 3],
      [4, 2],
    ],
  },
  {
    E: [
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [2, 8],
      [2, 9],
      [2, 10],
      [4, 8],
      [4, 9],
      [6, 8],
      [6, 9],
      [6, 10],
    ],
  },
  {
    L: [
      [2, 13],
      [3, 13],
      [4, 13],
      [5, 13],
      [6, 13],
      [6, 14],
      [6, 15],
      [6, 16],
    ],
  },
  {
    L: [
      [2, 19],
      [3, 19],
      [4, 19],
      [5, 19],
      [6, 19],
      [6, 20],
      [6, 21],
      [6, 22],
    ],
  },
  {
    O: [
      [2, 25],
      [3, 25],
      [4, 25],
      [5, 25],
      [6, 25],
      [2, 26],
      [2, 27],
      [2, 28],
      [6, 26],
      [6, 27],
      [6, 28],
      [3, 29],
      [4, 29],
      [5, 29],
    ],
  },
  {
    W: [
      [2, 31],
      [3, 31],
      [4, 31],
      [5, 31],
      [6, 31],
      [6, 33],
      [5, 34],
      [4, 35],
      [6, 35],
      [2, 37],
      [3, 37],
      [4, 37],
      [5, 37],
      [6, 37],
    ],
  },
  {
    O: [
      [2, 39],
      [3, 39],
      [4, 39],
      [5, 39],
      [6, 39],
      [2, 40],
      [2, 41],
      [2, 42],
      [6, 40],
      [6, 41],
      [6, 42],
      [3, 43],
      [4, 43],
      [5, 43],
    ],
  },
  {
    R: [
      [2, 45],
      [3, 45],
      [4, 45],
      [5, 45],
      [6, 45],
      [2, 46],
      [2, 47],
      [2, 48],
      [3, 48],
      [4, 46],
      [4, 47],
      [5, 47],
      [6, 48],
    ],
  },
  {
    L: [
      [2, 51],
      [3, 51],
      [4, 51],
      [5, 51],
      [6, 51],
      [6, 52],
    ],
  },
  {
    D: [
      [2, 45],
      [3, 45],
      [4, 45],
      [5, 45],
      [6, 45],
      [2, 46],
      [2, 47],
      [3, 48],
      [4, 48],
      [5, 48],
      [6, 46],
      [6, 47],
    ],
  },
];

const main = async () => {
  let commitCount = 0;
  const baseDate = new Date("1995-01-01T12:00:00Z"); // 日曜日から開始

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
