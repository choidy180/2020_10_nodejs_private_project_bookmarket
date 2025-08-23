<!-- BANNER -->
<p align="center">
  <img src="./public/private-book.jpg" alt="private-book Banner" width="200px" />
</p>

<h1 align="center">🕮 PRIVATE BOOKMARKET</h1>
<p align="center">
  <b>NodeJS기반의 도서구매사이트</b>
</p>

<p align="center">
  <a href="https://poke-next-amber.vercel.app">
    <img src="https://img.shields.io/badge/Live-Demo-blue?logo=vercel&logoColor=white" />
  </a>
  <a href="https://github.com/choidy180/poke-next">
    <img src="https://img.shields.io/github/stars/choidy180/poke-next?style=social" />
  </a>
  <img src="https://img.shields.io/github/license/choidy180/poke-next?color=brightgreen" />
  <img src="https://img.shields.io/badge/PRs-welcome-yellow?logo=github" />
  <img src="https://img.shields.io/badge/Made%20with-❤️-ff69b4" />
</p>

---

##  기능
- 📖 **책을 등록하고, 기본적인 쇼핑몰 기능 제공**
- 🌈 **도서 정보 제공** 도서의 기본적인 정보 및 이미지 제공공
- 🛍️ **구매기록 기반 혜택** 구매기록으로 포인트 및 등급제공하여, 회원별로 다른 할인율 적용

---

##  기술 스택
<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white" /> 
  <img src="https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=white" /> 
  <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=000" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" />
</p>

---

##  라이브 데모
-  URL: 현재 미배포
-  Next.js + Vercel 환경에서 배포 중

---

##  프로젝트 요약
#### 1. NodeJS + MYSQL DB 사용
#### 2. 날씨데이터 기반으로 의상이미지 조합하여, 사용자에게 다양한 의상정보 제공
#### 3. 날씨에 따라 무신사 추천 API 이용하여, 무신사 의상 추천 및 구매페이지 이동기능 제


##  Install
```bash
# 1) 레포지토리 복제
git clone https://github.com/choidy180/2020_07_DongseoAI
cd poke-next

# 2) 의존성 설치
npm install

# 3) 개발 서버 실행
npm run dev
# 브라우저에서 http://localhost:3000, http://127.0.0.1:3000 열기
```

## 📡 Example Code (Weather Api)
```bash

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/main.css">
    <title><%= title %></title>
</head>

<body>
    <div id="bgimg">
        <div class="bg">
            <div class="first_left_area">
                <div class="first_left_info">
                    <p class="main_top_city">BUSAN</p>
                    <div class="main_top_time_box">
                        <h1 id="watch">00:00</h1>&nbsp;&nbsp;&nbsp;<h1 id="am_pm">AP</h1>
                    </div>
                    <img class="weather_icon" src="sun.png" alt="sun" title="sun">
                    <h1 class="main_top_city" style="margin-top: 20px;">맑은 하늘</h1>
                    <div class="container">
                        <div class="card">
                            <h1 class="name" id="name"></h1>
                            <p class="temp"></p>
                            <p class="clouds"></p>
                            <p class="desc"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="first_right_area">
            </div>
        </div>
    </div>
    <div class="blank_box">
    </div>
    <iframe class="weather_frame" width="1600px" height="1500px" src="https://www.weather.go.kr/w/index.do"
        frameborder="0"></iframe>
    <iframe class="weather_frame_2" width="1200px" height="900px"
        src="https://earth.nullschool.net/#current/wind/surface/level/overlay=temp/orthographic=129.02,35.13,3000/loc=128.950,35.340"
        frameborder="0"></iframe>
    <div style="width: 50%; height: 150px; padding-left: 20px;">
        <h1 class="name" id="name" style="color: white; font-size: 40px; opacity: 0.8;">
        </h1>
        <p class="temp" style="color: white; font-size: 20px; opacity: 0.8;"></p>
        <p class="clouds" style="color: white; font-size: 20px; opacity: 0.8;"></p>
        <p class="desc" style="color: white; font-size: 20px; opacity: 0.8;"></p>
    </div>
    <div class="input">
        <input type="text" placeholder="도시를 입력하세요." class="input_text">
        <input type="submit" value="확인" class="submit">
      </div>
    </div>
    <script src="/js/background_img_change.js"></script>
    <script src="/js/get_weather_info.js"></script>
    <script src="/js/Time.js"></script>
    <script src="js/now_temperatures.js"></script>
    <script src="js/app.js"></script>

</body>

</html>
```
