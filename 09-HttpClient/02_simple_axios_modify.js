// 1. 모듈참조
import axios from 'axios';

// 2. 접속할 서버의 호스트 이름과 요청정보(path)설정
const url = 'http://data.hossam.kr/simple_text.txt';

// 3. GET방식으로 접속하기 위한 객체 생성(promise 방식)
axios
    .get(url)
    // 성공했을 때
    .then(function (response) {
        // 지정된 url의 컨텐츠를 성공적으로 가져온 경우 호출됨
        // --> 응답을 성공적으로 수신했다고 표현

        console.log('Promise 방식 - ' + response.data);
    })
    // 실패 했을 때
    .catch(function (error) {
        // Axios 표준 에러 내용
        console.log(`[Error Code] ${error.code}`);
        console.log(`[Error Message] ${error.message}`);

        // 백엔드에 접속은 되었으나 에러가 발생한 경우
        // 아래 내용이 표시되지 않는다면 대상 시스템에 접속조차 못한 경우이다.
        // ex) 도메인 자체가 잘못됨, 네트워크 연결이 되지 않음 등
        if (error.response !== undefined) {
            // 지정된 url로의 요청에 실패한 경우 호출됨
            // 에러 내용에서 상태코드(숫자)와 에러 메시지만 추출
            // [ HTTP 상태코드 ]
            //  - 200(OK)
            //  - 404(Page Not Fund)
            //  - 401(권한없음, 로그인필요)
            //  - 403(접근금지, 폴더에 접속한 경우)
            //  - 50x(접속 대상에서 에러가 나고 있는 경우)
            const errorMsg = `${error.response.status} error - ${error.response.statusText}`;
            console.log(`[HTTP Status] ${errorMsg}`);
        }
    })

    .finally(function () {
        // 성공, 실패 여부에 상관없이 마지막에 무조건 호출됨
        // 필요 없다면 이 부분은 구현하지 않아도 됨
        console.log('Promise방식 - fin :)');
    });
// 가장 먼저 실행 후 결과에 따라 위에꺼 실행
console.log('Promise 방식으로 HTTP 요청');