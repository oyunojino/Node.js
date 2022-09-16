// 1. 패키지 참조
import {mkdirs} from '../helper/FileHelper.js';
import winston from 'winston';
import winstoknDaily from 'winston-daily-rotate-file';

// 2. 환경설정 정보
const LOG_PATH = '_files/_logs';
const LOG_LEVEL = 'debug';

// 3. 로그가 저장될 폴더 생성
mkdirs(LOG_PATH);

// 4. 로그가 출력될 형식 지정하기 위한 함수 추출
const { combine, timestamp, printf, splat, simple } = winston.format;