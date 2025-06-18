var prompt = require('prompt-sync')();


// const age = prompt("Enter Your Age");

// if(age > 10){
//     console.log("More than 10")

// }else{
//     console.log("Less than 10")
// }


var guest = ["Alice", "Bob", "Charlie", "David", "Eve"];
const name = prompt("Enter Your Name").trim();

let found = false;

for (let i = 0; i < guest.length; i++) {
    if (name == guest[i]) {
        console.log("Found name");
        found = true;
        break;
    }
}

if (!found) {
    console.log("Name not found");
}