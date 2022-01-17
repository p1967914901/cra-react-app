#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')
// const inquirer = require('inquirer')
const path = require('path')
const spawn = require('cross-spawn')

// const process = require('process')

const { render } = require('./render')
const { updateChk } = require('./update')
const { print } = require('./print')

program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  // .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 打印执行结果
    console.log('name:',name,'options:',options)
    // 模板目录
    const templatePath = path.join(__dirname, '../templates/')
    // 生成的文件目录
    const cmdUrl = process.cwd();
    render(templatePath, path.join(cmdUrl, name));
    // 执行安装
    const child = spawn(`yarn`, ['install'], { 
      stdio: 'inherit' ,
      cwd: path.join(cmdUrl, name)
    });
    // 监听执行结果
    child.on('close', function(code) {
      // 执行失败
      if(code !== 0) {
        console.log(chalk.red('Error occurred while installing dependencies!'));
        process.exit(1);
      }
      // 执行成功
      else {
        console.log(chalk.cyan('Install finished'));
        print(name);

      }
    })
  })
  
program
   // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')
  
// upgrade 检测更新
program
	// 声明的命令
	.command('upgrade')
    // 描述信息，在帮助信息时显示
	.description("Check the cra-react-app version.")
	.action(() => {
    	// 执行 lib/update.js 里面的操作
		updateChk()
	})


program
  // 监听 --help 执行
  .on('--help', () => {
    console.log('\r\n' + figlet.textSync('pxa', {
      font: 'Train',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));

    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`cra-react-app <command> --help`)} for detailed usage of given command\r\n`)
  })

// 解析用户执行命令传入参数
program.parse(process.argv);
