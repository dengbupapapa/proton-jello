const assert = require('assert');
const fs = require('fs');
const path = require('path');

let options = process.argv.slice(2);
let optRootIndex = options.indexOf('--root');

assert.ok(!!~optRootIndex && !!options[optRootIndex + 1], '请设置目标文件 --root xxx');

let dirname = options[optRootIndex + 1];
let dirPath = path.resolve(__dirname, dirname);
let exists = fs.existsSync(dirPath);

if (!exists) {
    try {
        fs.mkdirSync(dirPath)
    } catch (e) {
        // console.log(e);
        process.exit();
    }
}

/*
 *邓世伟
 *2018/02/08
 *由于fis区分发布与本地开发输出编译文件为两个文件夹时，fis server clean 会出现 清除上一次上一个包的位置的包，造成下一次打包报错，那么我们就在启动前先判断文件夹是否存在
 */