// 引入fs模块
var fs = require("fs");

// fs所有的功能函数封装在fsMethods对象中
var fsMethods = {
  // 保存this 方便链式编程
  saveThis: function() {
    return this;
  },
  /**
   * 检测是文件还是目录
   * options : {
   *    path: String 检测目标路径(必填)
   *    error(err): Function 失败执行的回调,会把失败信息当做参数传入回调(选填)
   *    isFile: Function 检测是文件执行的回调(选填)
   *    isDirectory: Function 检测是目录执行的回调(选填)
   * }
   */
  stat: options => {
    fs.stat(options.path, (err, stats) => {
      if (err) {
        // 检测是否成功
        if (options.error) {
          // 检测用户是否传入了失败时执行的回调
          options.error(err); //执行用户传入的回调
        } else {
          // 默认用户没有传入失败时执行的回调,默认打印失败信息
          console.log("stat检测失败了，失败信息:");
          console.log(err);
        }
        return;
      }
      // 检测成功
      if (stats.isFile()) {
        // 检测是文件
        if (options.isFile) {
          // 检测用户是否传入了检测是文件执行的回调
          options.isFile(); //执行用户传入的回调
        } else {
          // 默认打印:检测的是文件
          console.log(options.path + ":检测为文件");
        }
      } else {
        // 检测是目录
        if (options.isDirectory) {
          // 检测用户是否传入检测是目录后执行的回调
          options.isDirectory(); // 执行用户传入的回调
        } else {
          // 默认打印:检测的是目录
          console.log(options.path + ":检测为目录");
        }
      }
    });
    return fsMethods.saveThis();
  },
  /**
   * 创建目录
   * options:{
   *    path: String 创建的路径路径+目录名(必填)
   *    mode: Number 文件的读写权限(选填，默认0777)
   *    error(err): Function 失败执行的回调,会把失败信息当做参数传入回调(选填)
   *    success: Function 创建成功时执行的回调(选填)
   * }
   */
  mkDir: options => {
    fs.mkdir(options.path, options.mode ? options.mode : 0777, err => {
      if (err) {
        // 创建失败
        if (!options.error) {
          // 用户没传入失败时执行的回调
          console.log("mkdir失败了，失败信息:");
          console.log(err);
        } else {
          // 执行用户传入的回调
          options.error(err);
        }
        return;
      }
      // 创建成功
      if (!options.success) {
        // 用户未传入创建成功执行的回调
        console.log("创建成功!");
      } else {
        // 执行用户传入的穿件成功时执行的回调
        options.success();
      }
    });
    return fsMethods.saveThis();
  },
  /**
   * 创建写入文件
   * options: {
   *    path: String 文件写入的路径+文件名(必填)
   *    data: String|buffer 写入的内容 可使用字符串或buffer(选填)
   *    encoding: String 文件的编码格式 默认为'utf-8' 当data使用buffer数据(选填)
   *    mode: Number 文件的读写权限 默认438(选填)
   *    flag: String 默认值'w'
   *    error(err): Function 检测失败执行的回调,会把失败信息当做参数传入回调(选填)
   *    success: Function 创建成功时执行的回调(选填)
   * }
   */
  writeFile: options => {
    fs.writeFile(
      options.path,
      options.data ? options.data : "",
      {
        encoding: options.encoding || "utf-8",
        mode: options.mode || 438,
        flag: options.flag || "w"
      },
      err => {
        if (err) {
          // 如果创建写入失败
          if (!options.error) {
            // 默认失败时打印失败信息
            console.log("writeFile失败了，失败信息:");
            console.log(err);
          } else {
            // 执行用户传入失败时执行的回调
            options.error(err);
          }
          return;
        }
        // 创建写入成功
        // 创建成功
        if (!options.success) {
          // 用户未传入创建成功执行的回调
          console.log("创建成功!");
        } else {
          // 执行用户传入的成功时执行的回调
          options.success();
        }
      }
    );
    return fsMethods.saveThis();
  },
  /**
   * 追加文件
   * options: {
   *    path: String 文件写入的路径+文件名(必填)
   *    data: String|buffer 写入的内容 可使用字符串或buffer(选填)
   *    encoding: String 文件的编码格式 默认为'utf-8' 当data使用buffer数据(选填)
   *    mode: Number 文件的读写权限 默认438(选填)
   *    flag: String 默认值'a'
   *    error(err): Function 失败执行的回调,会把失败信息当做参数传入回调(选填)
   *    success: Function 追加成功时执行的回调(选填)
   * }
   */
  appendFile: options => {
    fs.appendFile(
      options.path,
      options.data ? options.data : "",
      {
        encoding: options.encoding || "utf-8",
        mode: options.mode || 438,
        flag: options.flag || "a"
      },
      err => {
        if (err) {
          // 如果追加失败
          if (!options.error) {
            // 默认失败时打印失败信息
            console.log("appendFile失败了，失败信息:");
            console.log(err);
          } else {
            // 执行用户传入失败时执行的回调
            options.error(err);
          }
          return;
        }
        // 创建写入成功
        // 创建成功
        if (!options.success) {
          // 用户未传入成功执行的回调
          console.log("追加成功!");
        } else {
          // 执行用户传入成功时执行的回调
          options.success();
        }
      }
    );
    return fsMethods.saveThis();
  },
  /**
   * 读取文件的内容
   * options:{
   *    path: String 读取文件的路径+文件名(必选)
   *    encoding: Arrary 文件的字符编码 读取文件一定要设置编码，否则默认是"buffer"形式出现 (选填)
   *    error(err): Function 检测失败执行的回调,会把失败信息当做参数传入回调(选填)
   *    success: Function 创建成功时执行的回调 会把成功后的data传入回调中的参数(选填)
   * }
   */
  readFile: options => {
    fs.readFile(
      options.path,
      options.encoding ? options.encoding : ["utf-8"],
      (err, data) => {
        if (err) {
          // 如果写入失败
          if (!options.error) {
            // 默认失败时打印失败信息
            console.log("readFile失败了，失败信息:");
            console.log(err);
          } else {
            // 执行用户传入失败时执行的回调
            options.error(err);
          }
          return;
        }
        // 读取成功
        if (!options.success) {
          // 用户未传入成功执行的回调
          console.log("读取成功!文件信息如下:");
          console.log(data.toString());
        } else {
          // 执行用户传入的穿件成功时执行的回调
          options.success(data);
        }
      }
    );
    return fsMethods.saveThis();
  },
  /**
   * 读取目录
   * options:{
   *    path: String 读取目录的路径+文件名(必选)
   *    error(err): Function 失败执行的回调,会把失败信息当做参数传入回调(选填)
   *    success: Function 成功时执行的回调 会把成功后的data传入回调中的参数(选填)
   * }
   */
  readDir: options => {
    fs.readdir(options.path, (err, data) => {
      if (err) {
        // 如果读取目录失败
        if (!options.error) {
          // 默认失败时打印失败信息
          console.log("readDir失败了，失败信息:");
          console.log(err);
        } else {
          // 执行用户传入失败时执行的回调
          options.error(err);
        }
        return;
      }
      if (!options.success) {
        // 用户未传入成功执行的回调
        console.log("读取目录成功!目录下有以下目录及文件:\n" + data);
      } else {
        // 执行用户传入成功时执行的回调
        options.success(data);
      }
    });
    return fsMethods.saveThis();
  },
  /**
   * 重命名（剪切）
   * options:{
   *    path: String 重命名的路径+文件名或目录名(必选)
   *    newPath: String 重命名后的路径+文件名或目录名(必选)
   *    error: Function(err) 失败时执行的回调 会把失败返回值传给回调当做参数(选填)
   *    success: Function(data) 创建成功时执行的回调 会把成功后的data传入回调中的参数(选填)
   * }
   */
  reName: options => {
    fs.rename(options.path, options.newPath, err => {
      if (err) {
        // 检测失败信息
        if (!options.error) {
          // 检测用户是否传入失败时执行的回调
          console.log("rename失败了，失败信息:");
          console.log(err);
          return;
        }
        // 执行用户传入的失败时执行的回调
        options.error(err);
      } else {
        // 操作成功
        if (!options.success) {
          // 检测用户是否传入成功时执行的回调
          console.log("重命名成功!");
          return;
        }
        // 执行用户传入的成功时执行的回调
        options.success();
      }
    });
    return fsMethods.saveThis();
  },
  /**
   * 删除目录
   * options:{
   *    path: String 删除目录的路径+文件名(必选)
   *    error(err): Function 失败执行的回调,会把失败信息当做参数传入回调(选填)
   *    success: Function() 成功时执行的回调(选填)
   * }
   */
  rmDir: options => {
    fs.rmdir(options.path, err => {
      // 检测是否失败
      if (err) {
        // 如果失败
        if (!options.error) {
          // 默认失败时打印失败信息
          console.log("rmdir失败了，失败信息:");
          console.log(err);
        } else {
          // 执行用户传入失败时执行的回调
          options.error(err);
        }
        return;
      }
      if (!options.success) {
        // 用户未传入成功执行的回调
        console.log("删除成功!");
      } else {
        // 执行用户传入成功时执行的回调
        options.success();
      }
    });
    return fsMethods.saveThis();
  },
  /**
   * 删除文件
   * options:{
   *    path: String 删除文件的路径+文件名(必选)
   *    error: Function(err) 失败时执行的回调,会把失败返回的信息err当做参数传入回调中(选填)
   *    success: Function 创建成功时执行的回调(选填)
   * }
   */
  unLink: options => {
    fs.unlink(options.path, err => {
      if (err) {
        // 如果失败
        if (!options.error) {
          // 默认失败时打印失败信息
          console.log("unlink失败了，失败信息:");
          console.log(err);
        } else {
          // 执行用户传入失败时执行的回调
          options.error(err);
        }
        return;
      }
      if (!options.success) {
        // 用户未传入成功执行的回调
        console.log("删除成功!");
      } else {
        // 执行用户传入成功时执行的回调
        options.success();
      }
    });
    return fsMethods.saveThis();
  }
};

// 暴露出去
module.exports = fsMethods;
