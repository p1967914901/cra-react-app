const chalk = require('chalk')


function print(name) {
  console.log(
    `Success!  Created  ${name}  at  ~/${name}\n\
Inside  that  directiory,  you  can  run  several  commands:\n\n\
  ${chalk.cyan('yarn start')}
      Starts  the  development  server.\n
  ${chalk.cyan('yarn build')}
      Bundles  the  app  into  static  files  for  production.\n
We  suggest that you begin by typing:\n
  ${chalk.cyan('cd')}  ${name}
  ${chalk.cyan('yarn start')}
    `
  );
}

module.exports = { print }