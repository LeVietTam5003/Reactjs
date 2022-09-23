import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { Link, useParams } from "react-router-dom"
import axios from "axios";

function Rate(props) {

    const [rating, setRating] = useState(0); // Ban đầu là chọn cái ngôi sao = 0  là k chọn cái nào
    const params = useParams();

    useEffect(() => {
        axios.get('http://localhost/laravel/public/api/blog/rate/' + params.id)
            .then(res => {
                // console.log(res);

                const getDataRate = res.data.data;
                // console.log(getDatarate)
                let lengthRate = getDataRate.length;
                let sum = 0;
                if (getDataRate.length > 0) {
                    getDataRate.map((value, key) => {
                        sum += value.rate
                    })
                    console.log(sum)
                }
                let AVG = sum / lengthRate;
                setRating(AVG);
            })
            .catch(errors => console.log(errors));
    }, []);
    // console.log(rating)
    // Lấy id của bài blog cần đánh giá sản phẩm
    // "Tương tự phần cmt, rate cần những param để gửi qua api: user_id, blog_id, rate. 
    // Hàm dùng để đánh giá
    function changeRating(newRating, name) {
        setRating(newRating)
            // console.log(rating);
        let checkLogin = localStorage.getItem("Login");
        // console.log(checkLogin)

        if (checkLogin) {
            let userData = localStorage.getItem("token_auth")
            userData = JSON.parse(userData)
                // console.log(userData)

            let url = 'http://localhost/laravel/public/api/blog/rate/' + params.id;

            // console.log(url);

            // lấy token trong localStorage để gởi qua confix
            let tokenData = userData.success.token;
            // console.log(tokenData);

            // config này dùng để gởi lên api
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + tokenData,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };

            // Lấy thông tin bỏ vào trong formdata để đẩy lên api
            const formData = new FormData();
            formData.append('blog_id', params.id);
            formData.append('user_id', userData.Auth.id);
            formData.append('rate', newRating);


            axios.post(url, formData, config)
                .then(res => {
                    // console.log(res);
                    // alert(res.data.message) 
                })

        } else {
            alert("Yêu cầu đăng nhập")
        }
    }

    // Hàm dùng để render
    function render() {
        return ( <
            StarRatings rating = { rating }
            starRatedColor = "yellow"
            changeRating = { changeRating }
            numberOfStars = { 5 }
            name = 'rating' /
            >
        )
    }

    return ( <
        div className = "rating-area" >
        <
        ul className = "ratings" >
        <
        li className = "rate-this" > Rate this item: < /li> <
        li > { render() } <
        /li> <
        li className = "color" > ({ Math.round(rating * 100) / 100 }
            votes) < /li> <
        /ul> <
        ul className = "tag" >
        <
        li > TAG: < /li> <
        li >
        <
        Link className = "color"
        to >
        Pink < span > /</span >
        <
        /Link> <
        /li> <
        li >
        <
        Link className = "color"
        to >
        T - Shirt <span span > /</span >
        <
        /Link> <
        /li> <
        li >
        <
        Link className = "color"
        to >
        Girls <
        /Link> <
        /li> <
        /ul> <
        /div>

    )

}

export default Rate;