var a = 9;
var b= 10;
var ans = a+b;
console.log("AnswerNew",ans);
console.log("checktype:",typeof(ans))


 
const car = ["ai","bi","ci",34];
car.push("bv");
console.log(car)
console.log(car[2])


// filter function

var a = [10,11,23,45,67];
var b = a.filter(checkAges)

// const checkAges = (b) =>{
//      return b>=11;
// }

function checkAges(b) {
     return b<=11;
}

console.log(b);