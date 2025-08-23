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

---

##  프로젝트 요약
#### 1. NodeJS + MYSQL DB 사용
#### 2. 기본적인 도서 구매 사이트의 기능 및, 일반 쇼핑몰의 결제포함 기능 제공 


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

var express = require("express");
const pool = require("../config/dbconfig");
const { HTTPVersionNotSupported, NotExtended } = require("http-errors");
var router = express.Router();
const session = require("express-session");
const { connect } = require("./board");
const { createConnection } = require("mysql");

// 날짜 포맷
Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";
    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case "dd": return d.getDate().zf(2); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
            case "ss": return d.getSeconds().zf(2); // 초 (2자리)
            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
            default: return $1;
        }
    });
};
String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };



// 메인페이지
router.get("/", function (req, res) {
  sess = req.session;
  console.log("메인페이지");
  var sql = "SELECT * FROM BOOK";
  pool.getConnection((err, conn) => {
    conn.query(sql, function (err, row) {
      if (err) {
        console.log(sql);
        console.log(err);
      }
      console.log(typeof(row[0]));
      if (row) {
        res.render("index.ejs", {
            title: "메인페이지",
            page: "main/main.ejs",
          row: row,
          sess: sess,
        });
        conn.release();
      }
    });
  });
});
// 회원가입
router.get("/sign", function (req, res) {
    console.log("회원가입");
    res.render("user/sign.ejs", {
      title: "회원가입",
    });
});
// 로그인
router.get("/login/:para", function (req, res) {
    var sess = req.session;
    var para = req.params.para;
    sess.destroy();
    console.log("로그인");
    res.render("user/login.ejs", {
      title: "로그인",
      para:para
    });
});

// 로그아웃 요청
router.get('/logout', function (req, res) {
    var sess = req.session;
    console.log("로그아웃");
    console.log(sess);
    sess.destroy();
    res.redirect('/');
});

// 마이페이지
router.get('/mypage', function (req, res) {
    var sess = req.session;
    console.log("마이페이지");
    res.render("index.ejs", {
        title: "마이 페이지",
        page: "user/mypage.ejs",
        sess:sess
    });
});

// 주소정보
router.get('/mypage/address', function (req, res) {
    var sess = req.session;
    var sql = "SELECT * FROM address where USER_ID = ?";
    console.log("주소정보");
    pool.getConnection((err, conn) => {
        conn.query(sql,[sess.user.USER_ID] ,function (err, row) {
          if (err) {
            console.log(sql);
            console.log(err);
            conn.release();
          }
          if (row) {
            res.render("index.ejs", {
                title: "마이 페이지-주소정보",
                page: "user/address_info.ejs",
                sess:sess,
                row:row
            });
            conn.release();
          }
        });
    });
});
// 주소 등록
router.get('/mypage/address_info_registration', function (req, res) {
    var sess = req.session;
    console.log("주소정보");
    res.render("index.ejs", {
    title: "마이 페이지-주소등록",
    page: "user/address_info_registration.ejs",
    sess:sess,
    })
});

// 카드정보
router.get('/mypage/card', function (req, res) {
    var sess = req.session;
    var sql = "SELECT * FROM card where USER_ID = ?";
    console.log("카드정보");
    pool.getConnection((err, conn) => {
        conn.query(sql,[sess.user.USER_ID] ,function (err, row) {
          if (err) {
            console.log(sql);
            console.log(err);
            conn.release();
          }
          if (row) {
            res.render("index.ejs", {
                title: "마이 페이지-카드정보",
                page: "user/card_info.ejs",
                sess:sess,
                row:row
            });
            conn.release();
          }
        });
    });
});

// 장바구니
router.get('/mypage/order', function (req, res) {
    console.log("장바구니");
    var sess = req.session;
    var sql = "SELECT * FROM  cart where USER_ID = ?";
    var sql2 = "SELECT * FROM  cart_detail where CART_UID = ?";
    var sql3 = "SELECT * FROM book,cart_detail where cart_detail.BOOK_NUMBER  = book.BOOK_NUMBER and CART_UID = ?"
    var card_sql = "SELECT * FROM card where USER_ID =?"
    var address_sql = "SELECT * FROM address where USER_ID =?"
    var coupon_get_sql = "SELECT * FROM coupon where coupon.USER_ID=? AND coupon.use_or_not = 0"
    pool.getConnection((err, conn) => {
        conn.query(sql,[sess.user.USER_ID] ,function (err, row) {
            if (err) {
              console.log(sql);
              console.log(err);
              conn.release();
            }
            conn.query(sql2,[row[0].CART_UID] ,function (err, row2) {
                if (err) {
                  console.log(sql);
                  console.log(err);
                  conn.release();
                }
                if(row2[0] == undefined){
                    if (row2) {
                        res.render("index.ejs", {
                        title: "마이 페이지-주문정보",
                        page: "user/order_info.ejs",
                        sess:sess,
                        row:row,
                        row2:row2
                        });
                      conn.release();
                      }
                } else {
                    conn.query(sql3 , [row2[0].CART_UID],function (err, row3) {
                        conn.query(card_sql , [sess.user.USER_ID],function (err, card) {
                            conn.query(address_sql , [sess.user.USER_ID],function (err, address) {
                                for(var k = 0; k < row3.length; k ++){
                                    row3[k].CART_REGIST_DATE = row3[k].CART_REGIST_DATE.format('yyyy-MM-dd a/p hh:mm:ss');
                                }
                                if (err) {
                                  console.log(sql);
                                  console.log(err);
                                  conn.release();
                                  return;
                                }
                                conn.query(coupon_get_sql , [sess.user.USER_ID],function (err, coupon) {
                                    if (err) {
                                      console.log(sql);
                                      console.log(err);
                                      conn.release();
                                      return;
                                    }
                                    console.log(coupon)
                                    if (row3) {
                                      res.render("index.ejs", {
                                      title: "마이 페이지-주문정보",
                                      page: "user/order_info.ejs",
                                      sess:sess,
                                      row:row,
                                      row2:row2,
                                      row3:row3,
                                      card : card,
                                      address:address,
                                      coupon:coupon
                                      });
                                    console.log("장바구니");
                                    conn.release();
                                    }
                                });
                            });
                        });
                    });
                }
            });
        });
    });
});

// 카드 등록
router.get("/card_registration", function(req, res){
    var sess = req.session;
    console.log("카드 등록")
    res.render("index.ejs", {
        title: "카드등록 페이지",
        page: "user/card_registration.ejs",
        sess:sess
    });
})


//검색
router.get('/search', function (req, res) {
    var sess = req.session;
    console.log("검색페이지");
    res.render("index.ejs", {
        title: "검색 페이지",
        page: "main/search.ejs",
        sess:sess
    });
});
// 검색 결과
router.get("/search/:search_content", function (req, res, next) {
    // 검색
    var content = req.params.search_content.split("category=")[0];
    // 카테고리
    var content2 = req.params.search_content.split("category=")[1];
    sess = req.session;
    var sql1 = "SELECT * FROM BOOK where BOOK.BOOK_NAME LIKE concat('%', ?, '%')";
    var sql2 = "SELECT * FROM BOOK where BOOK.BOOK_AUTHOR LIKE concat('%', ?, '%')";
    var sql3 = "SELECT * FROM BOOK where BOOK.BOOK_PUBLICATION LIKE concat('%', ?, '%')";
    // 이름검색시 카테고리 이름으로
    if(content2 == "NAME"){
       var sql = sql1;
    }
    if(content2 == "AUTHOR"){
       var sql = sql2;
    }
    if(content2 == "PUBLICATION"){
       var sql = sql3;
    }
    pool.getConnection((err, conn) => {
        conn.query(sql, [content], function (err, row) {
          if (err) {
            console.log(err);
            conn.release();
          }
          if(row[0] == undefined){
            res.render("index.ejs", {
                title: '검색 결과 없음',
                page: "board/search_book_list.ejs",
                sess:sess,
                row:row,
                content:content
            });
            conn.release();
          } else {
            if (row) {
                res.render("index.ejs", {
                    title: '검색 결과',
                    page: "board/search_book_list.ejs",
                    sess:sess,
                    row:row,
                    content:content
                });
                conn.release();
              }
          }
        });
      });
});

// 검색한 책 리스트
router.get("/book/:number", function (req, res) {
    var number = req.params.number;
    sess = req.session;
    console.log("책 세부 페이지");
    var sql = "SELECT * FROM BOOK where BOOK.BOOK_NUMBER=?";
    pool.getConnection((err, conn) => {
        conn.query(sql, [number], function (err, row) {
          if (err) {
            console.log(sql);
            console.log(err);
            conn.release();
          }
          if (row) {
            res.render("index.ejs", {
                title: row[0].BOOK_NAME,
                page: "board/book.ejs",
                sess:sess,
                row:row
            });
            conn.release();
          }
        });
      });
});

// 장르별 책 페이지
router.get("/book_CATEGORY/:category", function (req, res) {
    var category = req.params.category;
    sess = req.session;
    console.log("책 세부 페이지");
    var sql = "SELECT * FROM book where BOOK.BOOK_CATEGORY=?";
    pool.getConnection((err, conn) => {
        conn.query(sql, [category], function (err, row) {
          if (err) {
            console.log(sql);
            console.log(err);
            conn.release();
          }
          if (row) {
            res.render("index.ejs", {
                title: category,
                page: "board/search_book_result.ejs",
                sess:sess,
                row:row,
                category:category
            });
            conn.release();
          }
        });
      });
});

// 바로결제 페이지
router.get("/order_page/:content", function (req, res) {
    var book_number = req.params.content.split('division')[0];
    var book_count = req.params.content.split('division')[1];
    var sess = req.session;
    console.log("바로 결제 페이지");
    var book_sql = "SELECT * FROM book where BOOK.BOOK_NUMBER=?";
    var card_sql = "SELECT * FROM card where card.USER_ID=?"
    var address_sql = "SELECT * FROM address where address.USER_ID=?"
    var coupon_get_sql = "SELECT * FROM coupon where coupon.USER_ID=? AND coupon.use_or_not = 0"
    pool.getConnection((err, conn) => {
        conn.query(book_sql, [book_number], function (err, row) {
          if (err) {
            console.log(err);
            conn.release();
          }
          conn.query(card_sql, [sess.user.USER_ID], function (err, row2) {
            if (err) {
              console.log(err);
              conn.release();
            }
            conn.query(address_sql, [sess.user.USER_ID], function (err, row3) {
                if (err) {
                  console.log(err);
                  conn.release();
                }
                conn.query(coupon_get_sql, [sess.user.USER_ID], function (err, row4) {
                    if (err) {
                      console.log(err);
                      conn.release();
                    }
                    console.log(row4);
                    if (row3) {
                      res.render("index.ejs", {
                          title: "결제 페이지",
                          page: "board/direct_order_page.ejs",
                          sess:sess,
                          row:row,
                          row2:row2,
                          row3:row3,
                          row4:row4,
                          book_count:book_count
                      });
                      conn.release();
                    }
                  });
              });
          });
        });
      });
});

// 주문목록
router.get("/order_list", function(req, res){
    console.log("주문 목록");
    var sess = req.session;
    var order_list_sql = "SELECT * FROM ORDER_LIST WHERE USER_ID=?";
    var order_list_sql2 = "SELECT * FROM ORDER_DETAIL WHERE USER_ID=?";
    pool.getConnection((err, conn) => {
        conn.query(order_list_sql, [sess.user.USER_ID] , function (err, row){
            if(err){
                console.log(err);
                conn.release();
            }
            for(var z1 = 0; z1 < row.length; z1 ++){
                row[z1].ORDER_DATE = row[z1].ORDER_DATE.format('yyyy-MM-dd a/p hh:mm:ss');
            }
            conn.query()
            if(row){
                res.render('index.ejs',{
                title: "주문 목록",
                page: "user/order_list.ejs",
                row:row,
                sess:sess,
                })
                conn.release();
            }
        })
    })
})


// 쿠폰
router.get("/coupon_issue", function (req, res) {
    var sess = req.session;
    console.log("쿠폰 등록")
    res.render("index.ejs", {
        title: "쿠폰등록  페이지",
        page: "main/coupon_issue.ejs",
        sess:sess
    });
});
```
