/*----------------------------------------------------------
    | 1) 모듈참조
-----------------------------------------------------------*/
// 직접 구현한 모듈
import logger from "../helper/LogHelper.js";
import { myip, urlFormat } from "../helper/UtilHelper.js";
// 내장 모듈
import url from "url";
import path from "path";
// 설치가 필요한 모듈
import dotenv from "dotenv";
import express, { Router } from "express";              // Express 본체
import useragent from "express-useragent";  // 클라이언트의 정보를 조회할 수 있는 기능
import serveStatic from "serve-static";     // 특정 폴더의 파일을 URL로 노출시킴
import serveFavicon from "serve-favicon";   // favicon 처리

/*----------------------------------------------------------
    | 2) Express 객체 생성
-----------------------------------------------------------*/
// 여기서 생성한 app 객체의 use() 함수를 사용해서
// 각종 외부 기능, 설정 내용, URL을 계속해서 확장하는 형태로 구현이 진행된다.
const app = express();

// 프로젝트 폴더 위치
const __dirname = path.resolve();

// 설정 파일 내용 가져오기
// PUBLIC_PATH(= ./public)폴더에 HTML파일이 포함됨
dotenv.config({ path: path.join(__dirname, "config.env") });


/*----------------------------------------------------------
    | 3) 클라이언트의 접속시 초기화
-----------------------------------------------------------*/
// app객체에 UserAgent 모듈을 탑재
//  --> Express객체 (app)에 추가되는 확장 기능들을 Express에서는 미들웨어라고 부른다.
//  --> UserAgent 모듈은 초기화 콜백함수에 전달되는 req, res객체를 확장하기 때문에 다른 모듈보다 먼저 설정되어야 한다.
app.use(useragent.express());

app.use((req, res, next) => {
    logger.debug('클라이언트가 접속했습니다.');

    // 클라이언트가 접속한 시간
    const beginTime = Date.now();

    // 클라이언트의 IP주소(출처: 스택오버플로우)
    // ip 주소를 모두 찾을 수 있는 방법 나열(로직)
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    // 클라이언트의 디바이스 정보 기록(UserAgent 사용)
    logger.debug(`[client] ${ip} / ${req.useragent.os} / ${req.useragent.browser} (${req.useragent.version}) / ${req.useragent.platform}`);

    // 클라이언트가 요청한 페이지URL
    // 콜백함수에 전달되는 req 파라미터는 클라이언트가 요청한 URL의 각 부분을 변수로 담고 있다.
    const current_url = urlFormat({
        protocol: req.protocol,         // ex) http://
        host: req.get('host'),          // ex) 172.16.141.1
        port: req.port,                 // ex) 3000
        pathname: req.originalUrl,      // ex) /page1.html
    });
    logger.debug(`[${req.method}] ${decodeURIComponent(current_url)}`);

    // 클라이언트의 접속이 종료된 경우의 이벤트 --> 모든 응답의 전송이 완료된 경우
    res.on('finish', () => {
        // 접속 종료시간
        const endTime = Date.now();

        // 이번 접속에서 클라이언트가 머문 시간 = 백엔드가 실행하는데 걸린 시간
        // 일반적인 데이터 핸들링일 경우, 1초가 넘어가면 다시 만들어야함
        const time = endTime - beginTime;
        logger.debug(`클라이언트의 접속이 종료되었습니다. ::: [runtime] ${time}ms`);
        logger.debug('-------------------------------------------------------------');
    });

    // 이 콜백함수를 종료하고 요청 URL에 연결된 기능으로 제어를 넘김
    next();         // 함수임 // 다음 app.use()로 값이 넘어감
});


/*----------------------------------------------------------
    | 4) Express 객체의 추가 설정
-----------------------------------------------------------*/
// HTML, CSS, IMG, JS 등의 정적 파일을 URL에 노출시킬 폴더 연결
// "http://아이피(혹은 도메인):포트번호" 이후의 경로가 router에 등록되지 않은 경로라면
// static 모듈에 연결된 폴더 안에서 해달 경로를 탐색한다.
app.use('/', serveStatic(process.env.PUBLIC_PATH));

// FAVICON 설정
app.use(serveFavicon(process.env.FAVICON_PATH));

// 라우터(URL 분배기) 객체 설정 --> 맨 마지막에 설정
// 외부에서 들어오는 URL을 각각의 내장 함수에 분배하는 것
// 라우터 대표적인 예시 - ip 공유기
const router = express.Router();
// 라우터 express에 등록
app.use('/', router);


/*----------------------------------------------------------
    | 5) 각 URL별 백엔드 기능 정의
-----------------------------------------------------------*/
// 01-setup.js
// 전통적인 웹서버 구성
// 아래는 RESTFul 구현 시 사용하는 방법
// router.route(path).get|post|put|delete((req, res, next) => {})
router.get('/page1', (req, res, next) => {
    // 브라우저에게 전달할 응답 내용
    let html = '<h1>Page1_윤진</h1>';
    html += '<h2>Express로 구현한 Node.js 백엔드 페이지</h2>';

    // 1. 백엔드의 프로그램 처리 로지 구현
    // 응답보내기(1) - Node 순정 방법
    // res.writeHead(200);
    // res.write(html);
    // res.end();


    // 2. html 파일을 로드 <----- 각종 () 존재함
    // 3. 로그인 html의 ()변수값으로 replace
    // 응답보내기(2) - Express의 간결화된 방법
    // res.status(200);
    // res.send(html);

    // 메서드 체인 가능
    res.status(200).send(html);
});

router.get('/page2', (req, res, next) => {
    // 브라우저에게 전달할 응답 내용
    let html = '<h1>Page2</h1>';
    html += '<h2>Node.js Backend Page</h2>'
    //html += '<h2>node.js backend page</h2>';

    res.status(200).send(html);
});

router.get('/page3', (req, res, next) => {
    // 페이지 강제 이동
    res.redirect('https://www.naver.com');
});

// 02. GetParams.js
// 02_get_params_by_link.html
// 02_get_params_by_form.html
// 02_get_params_by_js.html

router.get('/send_get', (req, res, next) => {
    // GET 파라미터들은 req.query 객체의 하위 데이터로 저장된다.

    logger.debug('[ 프론트엔드로부터 전달받은 GET 파라미터 ]');
    //req.query => json
    // { key: value, ...}형식으로 분류하는 반복문
    // k = {a:100}일 때, 어떤 형식으로 변환해야할까?
    // 1. k.a    => 하나하나 일일히 작성해야하기 때문에 어려움
    // 2. k["a"] => 배열형식이어야지 반복문 쓰기 편함
    for (let key in req.params) {
        const str = '/t >> ' + key + '=' + req.params[key];
        logger.debug(str);
    }

    // /send_get?answer=0000 형태로 접근한 경우 answer 파라미터 값 추출
    // const answer = req.query['answer'];
    const answer = req.query.answer;
    let html = null;

    if (parseInt(answer) == 300) {
        html = "<h1 style = 'color:#0066ff'>정답입니다.</h1>";
    }
    else {
        html = "<h1 style = 'color:#ff6600'>틀렸습니다.</h1>";
    }
    res.status(200).send(html);
});

// 직접 URL로 테스트
router.get('/send_url/:username/:age', (req, res, next) => {
    // 콜론(:)이 붙는 것은 문자열이 아닌 변수임
    //  ex) req.query.username / req.query.age 로 받음
    
    // URL 파라미터들은 req.params 객체의 하위 데이터로 저장된다.
    // 전달받은 URL 파라미터는 GET 파라미터와 같은 방법으로 사용 가능함

    // ex) http://172.16.146.25:3001/send_url/이젠/30
    // 출력 - 이젠님은 30세 입니다.
    logger.debug('[프론트엔드로부터 전달받은 URL 파라미터]');
    // req.params = {
    //     username: "이젠",
    //     age: "30"
    // };
    for (let key in req.params) {
        const str = '\t >> ' + key + '=' + req.params[key];
        logger.debug(str);
    }

    const html = "<h1><span style= 'color:#0066ff'>" + req.params.username + "</span>님은 <span style = 'color:#ff6600'>" + req.params.age + "</span>세 입니다.</h1>";

    res.status(200).send(html);
});


/*----------------------------------------------------------
    | 6) 설정한 내용을 기반으로 서버 구동 시작
-----------------------------------------------------------*/
const ip = myip();

app.listen(process.env.PORT, () => {
    logger.debug('----------------------------------------------');
    logger.debug('|            Start Express Server            |');
    logger.debug('----------------------------------------------');

    ip.forEach((v, i) => {
        logger.debug(`server address => http://${v}:${process.env.PORT}`);
    });

    logger.debug('----------------------------------------------');
});