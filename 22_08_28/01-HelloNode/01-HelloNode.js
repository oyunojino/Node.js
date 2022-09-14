console.group("First");

// 개발 단계에서 부수적인 데이터를 출력하고자 할 때 사용
// --> 제품을 배포할 때는 로그는 웬만하면 삭제해서 배포하는게 좋음
//     무언가 출력한다는 것은 성능에 영향을 줄 수 있음(정말 필요한 로글가 아니라면 다 지우고 배포하는게 중요)
console.log("Hello World");

// 개발자가 변수의 값을 확인하기 위한 용도로 사용하는 출력
// --> 통상적으로 console.log와 그게 구분하지 X
console.debug("Hello World");

// 시스템 정보를 출력할 때 사용
// --> 개발 단계에서 지우고 배포
console.info("Hello World");

// 경보 단계(에러는 아니지만 정상적이지 않다고 판단되는 경우)
console.warn("Hello World");

// 에러! 심각할 경우, 예상하지 못한 에러, 시스템 에러
console.error("Hello World");

console.groupEnd();