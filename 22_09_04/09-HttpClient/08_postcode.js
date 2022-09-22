import axios from 'axios';

// API 참조: https://www.juso.go.kr/addrlink/devAddrLinkRequestGuide.do?menu=roadApi
(async () => {
    let json = null;
    try {
        // axios를 활용하여 다른 백엔드에게 HTTP GET 파라미터를 전달하고 결과를 리턴받음
        const response = await axios.get("http://www.juso.go.kr/addrlink/addrLinkApi.do", {
            params: {
                confmKey: 'devU01TX0FVVEgyMDIyMDkxODE0NTYxOTExMjk4MDY=',    // 발급받은 승인키
                currentPage: 1,                     // 현재 페이지 번호
                countPerPage: 20,                   // 페이지당 출력할 결과 Row 수
                keyword: "서초W",                   // 주소 검색어
                resultType: 'json'                  // 검색결과형식 설정(xml, json)
            }
        });

        //console.log(JSON.stringify(response.data));

        if (response.data.results?.common?.errorCode !== "0") {
            const error = new Error();
            error.response = {
                status: response.data.results.common.errorCode,
                statusText: response.data.results.common.errorMessage
            }

            throw error;
        }
        json = response.data;
    }
    catch (error) {
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
        return;
    }

    json.results.juso.map((item, index) => {
        console.log("[%s] ", item.zipNo);
        console.log("[지번주소] " + item.jibunAddr);
        console.log("[도로명주소] " + item.roadAddr);
        console.log();
    });
})();