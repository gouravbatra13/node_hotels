var fs = require('fs');
var os = require('os');


/**
 * Os helps in get operating system data
 */
console.log(os.userInfo().username);


/**
 * fs create the new file and append data into  it
 */

fs.appendFile('greeting.txt','Hi'+os.userInfo().username+'!\n',()=>{
    console.log('file is created');
});