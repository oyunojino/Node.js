import { mkdirs } from './helper_1/FileHelper';
import path from 'path';

// 상대경로 방식으로 폴더 생성하기
// --> vscode가 열고 있는 프로젝트 폴더 기준
var target1 = './test/dir/make';
console.log(target1);
mkdirs(target1);

// 절대경로 방식으로 폴더 생성하기
// __dirname --> vscode가 열고 있는 프로젝트 폴더
const __dirname = path.resolve();
console.log(__dirname);
var target2 = path.join(__dirname, 'hello/node/js');
console.log(target2);
mkdirs(target2);
