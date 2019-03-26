import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import session from 'express-session';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '1gb',
    extended: false
}));

app.use(express.session({
    key: config.key, // 세션키
    secret: config.secret, // 비밀키
    cookie: {
        maxAge: 1000 * 60 * 60 * 2 // 쿠키 유효기간 2시간
    }
}));

//module setting
import { Users, Groups, Boards } from './mongo';

//서버 실행
const PORT = config.PORT || 9000;
app.listen(PORT, function() {
    console.log('server running in ' + PORT);
});

require('./routes/auth/auth')(app, Users);
require('./routes/group/setGroup')(app, Users, Groups);
// require('./routes/index')(app);