// 라이브러리를 사용하지 않는 경우 --> 코드가 더러워짐

// 1. 모듈참조
import http from 'http';    // node 내장모듈이므로 추가 설치X

// 2. 접속할 서버의 호스트 이름과 요청정보(path)설정
const url = 'http://data.hossam.kr/simple_text.txt';

// 3. GET방식으로 접속하기 위한 객체 생성
// res 접속객체(데이터 수신)
var req = http.get(url, function (res) {
    // 응답이 수신되는 경우(수신 데이터의 용량에 따라서 여러번 호출될 수 있다.)

    var resData = '';
    res.on('data', function (chunk) {
        // .on은 이벤트를 걸때 사용
        // 데이터용량 통신상태에 따라 여러번 호출될수 있음
        // 쪼개진걸 chunk로 들어감
        // 다 읽으면 end이벤트 사용
        resData += chunk;
    });

    // 응답수신이 종료된 경우(읽은 데이터를 처리함)
    res.on('end', function () {
        console.debug(resData);
    });
});

// 만약 읽어온 값이 이상하다면 아래 내용이 실행됨
// 4. 접속객체에 error 이벤트 리스너 설정
req.on('error', function (err) {
    console.error(err);
    console.error('에러 발생 : ' + err.message);
});