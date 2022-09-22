// require() 함수는 module.exports를 통해서 등록된 기능들을 리턴
// 리턴 받은 my객체는 module.exports에 확장된 기능들을 참조
// 파일 경로 명시할 때 확장자 생략 가능 (하지만 동일 경로라 하더라도 "./"는 생략 불가)
// "./"가 생략되는 경우는 node의 내장 모듈로 인식함
const my1 = require('./MyModule1');

// 모듈형태로 참조된 함수를 호출
my1();
console.log("\n");

//----------------------------------------------------------------------------------
const my2 = require('./MyModule2');

console.log(my2.name);
console.log(my2.property.id);
console.log(my2.property.type);
my2.say();

console.log(my2.home.postcode);
console.log(my2.home.address);
my2.home.getAddress();
console.log("\n");

//----------------------------------------------------------------------------------
// 클래스 형태의 모듈 참조
const my3 = require('./MyModule3');

// 리턴된 모듈은 클래스 형태이므로,
// 기능의 사용을 위해서는 인스턴스를 생성해야 함
var module_obj = new my3();
module_obj.say();
console.log("\n");

//----------------------------------------------------------------------------------
// 객체 형태의 모듈 참조
const my4 = require('./MyModule4');

// 리턴된 모듈은 객체 형태이므로,
// 직접 모듈 내의 기능을 호출할 수 있음
my4.say();