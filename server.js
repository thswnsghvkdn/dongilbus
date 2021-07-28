
const express = require('express')
const cors = require('cors');
const path = require('path');
const app = express()


// 코스 설정 
// 화이트 리스트 설정 로컬의 클라이언트 , 백엔드와 헤로쿠 url을 등록해놓는다.
const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://dongilbus.herokuapp.com', 'http://dongilbus.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
        // 요청한 url을 표시한다
        console.log("** Origin of request " + origin)
        // 화이트 리스트에 있는 요청을 허락한다.
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))

//app.get('/', (req, res) => res.send('hello'));
let obj = { lat: 36.769437094432845, lng: 126.93183543885787 }
app.get('/api/gps', function (req, res) {
    //console.log("post gps : ", req.query.lng)
    if (req.query.lat >= 36 && req.query.lng >= 126) {
        obj.lat = req.query.lat;
        obj.lng = req.query.lng;
    }
    res.send(obj)
})

if (process.env.NODE_ENV === 'production') {
    //  정적 파일을 가져 올수 있도록 경로를 설정 하는 미들웨어
    app.use(express.static(path.join(__dirname, 'client/build')));
    // 정적 파일인 빌드된 클라이언트 html 파일을 사용자에게 보여준다.
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

}

// app.use(express.static(path.join(__dirname, 'client/build')));
// // 정적 파일인 빌드된 클라이언트 html 파일을 사용자에게 보여준다.
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });
const PORT = process.env.PORT || 8080
app.listen(PORT, (req, res) => {
    console.log(`server listening on port: ${PORT}`)
});