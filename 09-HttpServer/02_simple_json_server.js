import logger from '../helper/LogHelper.js';
import { myip } from '../helper/UtilHelper.js';
import http from 'http';
import fs from 'fs';
import path from 'path';

// 'path.resolve()'는 vscode로 열고 있는 프로젝트 폴더의 경로를 반환함
const __dirname = path.resolve();
console.log(`현재 작업 디렉토리 위치: ${__dirname}`);

// 웹 서버 구동
const port = 3217;                      // 포트번호 설정
const ip = myip();
const server = http.createServer();     // 웹 서버 객체 만들기

server.listen(port, () => {
    logger.debug(port + '번 포트에서 백엔드가 구동되었습니다.');
    logger.debug('-------------------------------');

    // 나(백엔드)에게 접속할 수 있는 주소를 출력함
    ip.forEach((v, i) => {
        logger.debug('http://' + v + ':' + port);
    });
});

// 프론트엔드가 접속했을 대 발생하는 이벤트
server.on('connection', (socket) => {
    // 콜백함수에 전달되는 socket 객체를 사용하여 접속한 클라이언트의 정보를 파악한다.
    logger.debug('프론트엔드가 접속했습니다. : ' + socket.remoteAddress + ', ' + socket.remotePort);
    logger.debug(socket);
});

// connection이벤트 발생 직후 프론트엔드에게 결과값을 되돌려 주기 위해 호출되는 이벤트
// req(request)  -> 요청객체 : 브라우저가 서버에게 전달하는 정보를 담고 있다.
// res(response) -> 응답객체 : 서버가 브라우저에게 결과를 전송하는 기능을 갖는다.
server.on('request', (req, res) => {
    logger.debug('프론트엔드의 요청 >> [' + req.method + '] ' + req.url);

    if (req.url == '/sample.html') {
        // 클라이언트에게 전송할 응답 헤더 구성
        res.writeHead(200, {
            // 브라우저에게 인식시킬 출력 내용의 컨텐츠 형식
            'Content-Type': 'text/html; charset=utf-8'
        });
        // html 파일을 읽어들여서 응답객체(res)에 연결
        const path = __dirname + '/09-HttpServer/crud-axios-sample.html';
        fs.createReadStream(path).pipe(res);
    }
    // else if (req.url == '/nice.ezen') {

    //     res.writeHead(200, {
    //         'content-Type': 'text/html; charset=utf-8'
    //     });

    //     const path = __dirname + '/(배포용) 09-HttpServer/test.html';
    //     fs.createReadStream(path).pipe(res);
    // }
    else {
        // 클라이언트에게 전송할 응답 헤더 구성
        res.writeHead(200, {
            // 브라우저에게 인식시킬 출력 내용의 컨텐츠 형식
            //'Content-Type': 'text/html; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8',
            // CORS 접근 허용을 위한 설정
            //  : 접근을 허용할 도메인 혹은 IP(브라우저에 출력되고 있는 도메인을 의미함, *은 ALL의 의미)
            'Access-Control-Allow-Origin': '*',
            // 접근을 허용할 전송방식(기본값은 GET, POST만 허용함)
            'Access-Control-Allow-Methods': '*',
        });
        // 출력할 내용을 저장하기 위한 빈 변수
        let json = null;

        switch (req.method) {
            case 'GET':         // 데이터 조회 기능
                json = {
                    rt: 'OK',
                    message: 'GET방식에 대한 요청입니다.'
                }
                break;
            case 'POST':        // 데이터 저장 기능
                json = {
                    rt: 'OK',
                    message: 'POST방식에 대한 요청입니다.'
                }
                break;
            case 'PUT':         // 데이터 수정 기능
                json = {
                    rt: 'OK',
                    message: 'PUT방식에 대한 요청입니다.'
                }
                break;
            case 'DELETE':      // 데이터 삭제 기능
                json = {
                    rt: 'OK',
                    message: 'DELETE방식에 대한 요청입니다.'
                }
                break;
        }
        // JSON을 문자열로 변환 후 출력
        res.write(JSON.stringify(json));
        // 출력 종료를 알림
        res.end();
    }
});

// 서버 종료 이벤트
// 정상적인 상활에서는 발생할 가능성이 없다.
server.on('close', function () {
    logger.debug('백엔드가 종료되었습니다.');
});

// 예제이므로 타이머를 통해 백엔드를 60초 후 강제 종료
// setTimeout( ()=>{
//   server.close();
// }, 60000);