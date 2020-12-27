var express = require("express");
const app = express();
const { HTTPVersionNotSupported, InsufficientStorage } = require("http-errors");
var router = express.Router();
const pool = require("../config/dbconfig");


// 랜덤식별자 생성 (UUID)
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

router.post("/shopping_cart", function(req, res, next){
    // 카트 디테일 채구는 sql
    var sql_cart_detail = "insert into cart_detail(BOOK_NUMBER, CART_UID, BOOK_COUNT, CART_REGIST_DATE) values (?,?,?, now())";
    // 내 카트 정보 불러옴
    var sql_my_cart = "select * from cart where USER_ID=?"
    if(sess.user == undefined){
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
        res.write("<script> alert('로그인 된 회원만 이용할 수 있습니다..'); history.back();</script>");
        res.render("user/login.ejs", {
        title: "로그인",
    });
    } else {
        pool.getConnection((err, conn)=> {
            conn.query(sql_my_cart, [sess.user.USER_ID], 
                function(err, row){
                    if(err){
                        console.log(err);
                        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                        res.write("<script> alert('장바구니 등록에 문제가 있습니다..'); history.back(); </script>");
                        return;
                    }
                    conn.query(sql_cart_detail, [req.body.book_number, row[0].CART_UID, req.body.book_account], 
                        function(err, result){
                            if(err){
                                console.log(err);
                                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                                res.write("<script> alert('이미 담긴 책을 담을 수 없습니다..'); history.back(); </script>");
                                return;
                            }
                            if(result){
                                console.log(result);
                                res.redirect("/mypage/order");
                                return;
                            } else {
                            }
                        })
                })
        })
    }
})

// 주소 등록
router.post("/address_info_registration", function(req, res){
    var sql_address_info_regist = "insert into address(USER_ID, ADDRESS_NAME,ADDRESS_ZIP_CODE, ADDRESS_BASIC_ADDRESS, ADDRESS_DETAIL_ADDRESS) values (?,?,?,?,?)"
    var body = req.body;
    var sess = req.session;
    pool.getConnection((err, conn) => {
        conn.query(sql_address_info_regist, [sess.user.USER_ID, body.name ,body.zip_code, body.basic_address, body.detail_address], function (err, row) {
          if (err) {
            console.log(err);
            console.log(sql_address_info_regist);
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
            res.write("<script> alert('카드 등록에 문제가 있습니다..'); history.back(); </script>");
            return;
          }
          if(row){
            res.redirect("/mypage/address");
            return;
        } else {
        }
        });
    });
})

// 주소삭제
router.post('/delete_address/:UID_CODE', function (req,res){
    var uid = parseInt(req.params.UID_CODE);
    console.log(uid);
    console.log("주소 삭제");
    var sql_address_delete = "delete from address where ADDRESS_UID_CODE = ?"
    pool.getConnection((err, conn) => {
        conn.query(sql_address_delete, [uid], function(err, row){
            if(err){
                console.log(err);
                console.log(sql_address_delete);
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                res.write("<script> alert('주소 삭제에 문제가 있습니다..'); history.back(); </script>");
                return;
            }
            if(row){
                res.redirect("/mypage/address");
                conn.release();
                return;
            } else {
            }

        })
    })
})

// 카드 삭제
router.post('/delete_card/:CARD_NUMBER', function (req,res){
    console.log("넘어온다");
    var CARD_NUMBER = req.params.CARD_NUMBER;
    console.log("카드 삭제");
    var sql_card_delete = "delete from card where CARD_NUMBER = ?"
    pool.getConnection((err, conn) => {
        conn.query(sql_card_delete, [CARD_NUMBER], function(err, row){
            if(err){
                console.log(err);
                console.log(sql_card_delete);
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                res.write("<script> alert('카드 삭제에 문제가 있습니다..'); history.back(); </script>");
                return;
            }
            if(row){
                res.redirect("/mypage/card");
                conn.release();
                return;
            } else {
            }
        })
    })
})


// 장바구니 삭제
router.get('/delete_cart/:cart_detail', function (req,res){
    console.log("장바구니 삭제");
    var book_number = req.params.cart_detail.split('=')[0];
    var cart_uid = req.params.cart_detail.split('=')[1];
    console.log('책번호 : '+book_number)
    console.log('카트번호 : ' + cart_uid)
    var sql_cart_delete = "delete from cart_detail where CART_UID = ? and BOOK_NUMBER= ?"
    pool.getConnection((err, conn) => {
        conn.query(sql_cart_delete, [cart_uid, book_number], function(err, row){
            if(err){
                console.log(err);
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                res.write("<script> alert('카드 삭제에 문제가 있습니다..'); history.back(); </script>");
                return;
            }
            if(row){
                res.redirect("/mypage/order");
                conn.release();
                return;
            } else {
            }
        })
    })
})

//바로 결제 주문
router.post('/direct_order/:number',function(req,res){
    var body = req.body;
    var sess = req.session;
    var direct_order_number = req.params.number;
    var discount_price = 0;
    var total_price = 0;
    if(body.coupon == 1000){
        total_price = body.total_price - 1000
        var discount_price = 1000;
    } else if (body.coupon == 10){
        var discount_price = total_price * 0.1;
        total_price = body.total_price - 1000 * 0.9
    }
    var direct_order_sql = "insert into db_homework.ORDER_LIST(USER_ID, ORDER_DATE, ORDER_AMOUNT, CARD_NUMBER, ORDER_TOTAL_PRICE, CARD_DATE, ADDRESS_ZIP_CODE, ADDRESS_BASIC_ADDRESS, ADDRESS_DETAIL_ADDRESS, FIRST_BOOK_IMG, discount_price) values (?,now(),?,?,?,?,?,?,?,?,?)";
    var direct_order_sql2 = "insert into db_homework.ORDER_detail (BOOK_BOOK_NUMBER, ORDER_ORDER_NUMBER, ORDER_DETAIL_AMOUNT, discount_price) values (?,?,?,?)"
    var direct_update_amount1 = "SELECT BOOK_STOKE FROM BOOK where BOOK_NUMBER = ?"
    var direct_update_amount2 = "update book set BOOK_STOKE=? where book.BOOK_NUMBER=?"
    pool.getConnection((err, conn) => {
        conn.query(direct_order_sql,[sess.user.USER_ID, direct_order_number, body.card_number, total_price, body.card_date, body.address_zip_code, body.basic_address, body.detail_address, body.img, discount_price], 
            function(err, result){
                if(err){
                    console.log(err);
                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                    res.write("<script> alert('상품 구매에 문제가 있습니다..'); history.back(); </script>");
                    conn.release();
                    return;
                }
                console.log(result);
                conn.query(direct_order_sql2, [body.book_number, String(result.insertId) ,direct_order_number, discount_price], function(err, row2){
                    if(err){
                        console.log(err);
                        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                        res.write("<script> alert('상품 구매에 문제가 있습니다..'); history.back(); </script>");
                        return;
                    }
                    conn.query(direct_update_amount1, [body.book_number], function(err, row2){
                        if(err){
                            console.log(err);
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                            res.write("<script> alert('상품 구매에 문제가 있습니다..'); history.back(); </script>");
                            return;
                        }
                        conn.query(direct_update_amount2, [row2[0].BOOK_STOKE-direct_order_number, body.book_number], function(err, row3){
                            if(err){
                                console.log(err);
                                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                                res.write("<script> alert('상품 구매에 문제가 있습니다..'); history.back(); </script>");
                                return;
                            }
                            if(row3){
                                res.redirect("/");
                                conn.release();
                                return;
                            } else {
                            }
                        })
                    })
                })
        })
    })
})


// 장바구니 전체 구입
router.post('/cart_purchase', function(req,res ){
    var body = req.body;
    var sess = req.session;
    var sql_book_number_get = "select * from book where BOOK_NAME=?";
    var sql_solo_order_insert = "insert into db_homework.ORDER_LIST (USER_ID, ORDER_TOTAL_PRICE, ORDER_DATE, ORDER_AMOUNT, CARD_DATE, CARD_NUMBER, ADDRESS_ZIP_CODE, ADDRESS_BASIC_ADDRESS,ADDRESS_DETAIL_ADDRESS, FIRST_BOOK_IMG) values (?,?,now(),?,?,?,?,?,?,?)"
    var sql_solo_order_insert_detail = "insert into db_homework.order_detail (BOOK_BOOK_NUMBER, ORDER_ORDER_NUMBER, ORDER_DETAIL_AMOUNT, discount_price) values (?,?,?,?)"
    var update_book_stock = "update book set BOOK_STOKE=? where book.BOOK_NUMBER=?";
    var get_cart_sql = "select * from cart where USER_ID=?"
    var delete_cart_sql = "delete from cart_detail where CART_UID = ? AND BOOK_NUMBER =?"
    var discount_price = 0;
    pool.getConnection((err, conn) => {
        // 주문정보생성(order_table)
        var book_number_count_value = 0;
        conn.query(sql_solo_order_insert, [sess.user.USER_ID, body.cart_total_price, body.book_all_count, body.card_date, body.card_number, body.address_zip_code, body.basic_address, body.detail_address , body.img],
            function(err, order_result){
                if(err){
                    console.log(err);
                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                    res.write("<script> alert('장바구니 생성에 문제가 있습니다..'); history.back(); </script>");
                    return;
                }
                console.log(body.order_count_var.length);
                if(body.order_count_var.length > 1){
                    // 여러개일때
                    console.log("여러개");
                    if(order_result){
                    for(var c1 = 0; c1 < body.book_name.length; c1 ++){
                        // 장바구니 상세정보 생성(order_detail)
                        console.log(body.coupon[c1]);
                        if (body.coupon[c1] == 1000){
                            discount_price = 1000;
                            var total_price_value = body.total_price - 1000; 
                        }
                        else{
                            discount_price =  body.total_price * 0.1;
                            var total_price_value = body.total_price -  500; 
                        }
                        conn.query(sql_solo_order_insert_detail, [body.book_number[c1], order_result.insertId, body.book_count_value[c1], discount_price],
                            function(err, order_detail_result){
                                if(err){
                                    console.log(err);
                                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                                    res.write("<script> alert('장바구니 상세 등록에 문제가 있습니다..'); history.back(); </script>");
                                    return;
                                }
                            }
                        )
                        // 재고량 수정
                        conn.query(update_book_stock, [body.book_stoke[c1] - body.book_count_value[c1], body.book_number[c1]],
                            function(err, update_book_count_value){ 
                                if(err){
                                    console.log(err);
                                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                                    res.write("<script> alert('책 재고량 계산에 문제가 있습니다..'); history.back(); </script>");
                                    return;
                                }
                            }

                        )
                        // 장바구니 정보 가져오기
                        conn.query(get_cart_sql, [sess.user.USER_ID],
                            function(err, get_cart_sql_value){
                                if(err){
                                    console.log(err);
                                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                                    res.write("<script> alert('장바구니 정보를 가져오는데 문제가 있습니다..'); history.back(); </script>");
                                    return;
                                }
                                if(get_cart_sql_value){
                                    // 카트 삭제
                                    conn.query(delete_cart_sql ,[get_cart_sql_value[0].CART_UID, body.book_number[book_number_count_value]],
                                        function(err, delete_card_detail_result){
                                            if(err){
                                                console.log(err);
                                                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                                                res.write("<script> alert('장바구니 정보를 가져오는데 문제가 있습니다..'); history.back(); </script>");
                                                return;
                                            }
                                        }
                                    )
                                    book_number_count_value++;
                                }
                            }
                        )
                    }
                    conn.release();
                    res.redirect('/');
                }
                } else{
                    if(order_result){
                    // 한개일때
                    console.log("한개 주문");
                    console.log("한개주문 넘어온다");
                    conn.query(sql_solo_order_insert_detail, [body.book_number, order_result.insertId, body.book_count_value],
                        function(err, order_detail_result){
                            if(err){
                                console.log(err);
                                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                                res.write("<script> alert('장바구니 상세 등록에 문제가 있습니다..'); history.back(); </script>");
                                return;
                            }
                        }
                    )
                    // 재고량 수정
                    conn.query(update_book_stock, [body.book_stoke - body.book_count_value, body.book_number],
                        function(err, update_book_count_value){ 
                            if(err){
                                console.log(err);
                                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                                res.write("<script> alert('책 재고량 계산에 문제가 있습니다..'); history.back(); </script>");
                                return;
                            }
                        }

                    )
                    // 장바구니 정보 가져오기
                    conn.query(get_cart_sql, [sess.user.USER_ID],
                        function(err, get_cart_sql_value){
                            if(err){
                                console.log(err);
                                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                                res.write("<script> alert('장바구니 정보를 가져오는데 문제가 있습니다..'); history.back(); </script>");
                                return;
                            }
                            if(get_cart_sql_value){
                                // 카트 삭제
                                conn.query(delete_cart_sql ,[get_cart_sql_value[0].CART_UID, body.book_number],
                                    function(err, delete_card_detail_result){
                                        if(err){
                                            console.log(err);
                                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
                                            res.write("<script> alert('장바구니 정보를 가져오는데 문제가 있습니다..'); history.back(); </script>");
                                            return;
                                        }
                                        if(delete_card_detail_result){
                                            conn.release();
                                            res.redirect('/');
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
            }
        )
    })
})

//1000 원 할인 쿠폰
router.post("/coupon_1000", function(req, res){
    var sql_1000_coupon = "insert into coupon(coupon_type, user_id, use_or_not, issue_date, end_date) values (?,?,'0',now(),'2020-12-31 11:44:35')"
    var body = req.body;
    var sess = req.session;
    pool.getConnection((err, conn) => {
        conn.query(sql_1000_coupon, ["1000",sess.user.USER_ID], function (err, row) {
          if (err) {
            console.log(err);
            console.log(sql_address_info_regist);
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
            res.write("<script> alert('1000원 쿠폰 생성 등록에 문제가 있습니다..'); history.back(); </script>");
            return;
          }
          if(row){
            res.redirect("/");
            return;
        } else {
        }
        });
    });
})

//1000 원 할인 쿠폰
router.post("/coupon_10", function(req, res){
    var sql_1000_coupon = "insert into coupon(coupon_type, user_id, use_or_not, issue_date, end_date) values (?,?,'0',now(),'2020-12-31 11:44:35')"
    var body = req.body;
    var sess = req.session;
    pool.getConnection((err, conn) => {
        conn.query(sql_1000_coupon, ["10",sess.user.USER_ID], function (err, row) {
          if (err) {
            console.log(err);
            console.log(sql_address_info_regist);
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
            res.write("<script> alert('10% 쿠폰 생성 등록에 문제가 있습니다..'); history.back(); </script>");
            return;
          }
          if(row){
            res.redirect("/");
            return;
        } else {
        }
        });
    });
})
module.exports = router;
