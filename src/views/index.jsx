// CustomAxios
const { CustomAxios } = require('../CustomAxios');

//로그인
const { Auth } = require('./pages/Auth');
const { Love } = require('./pages/Love');
const { Tarot } = require('./pages/Tarot');
const { MyPage } = require('./pages/MyPage');
const { Main } = require('./pages/Main');

const { Chatting,ChatCard } = require('./component/Chatting');
const { DashBoard } = require('./component/DashBoard');




export default {
    // CustomAxios
    CustomAxios,
    //로그인
    Auth,Love,Tarot,Main,MyPage,
    Chatting,ChatCard,
    DashBoard
};
