# npm_error_resolution

```
npm WARN config global --global, --local are deprecated. Use --location=global instead. 해결
```

### 에러 설명

##### 실행 시 에러 발생

```javascript
npm install --save winston
npm install --save winston-daily-rotate-file
npm install --save dotenv
```

### 에러 해결 과정

1. PowerShell[ 관리자 권한 ]실행
2. 오류가 발생한 폴더위치로 이동
3. 순서대로 입력 후 Enter

   > Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
   >
   > > npm install --global --production npm-windows-upgrade
   > >
   > > > npm-windows-upgrade
   > > >
   > > > ```
   > > > ? Which version do you want to install? [버전 선택]
   > > > ```
   > > >
   > > > > npm -v

4. 필요한 패키지 설치

### 참고 자료

[Google](https://velog.io/@do_ng_iill/npm-WARN-config-global-global-local-are-deprecated.-Use-locationglobal-instead.-%ED%95%B4%EA%B2%B0)
