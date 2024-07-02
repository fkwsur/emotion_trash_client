import React, { useEffect, useState } from "react";
import plus_icon from "../../image/plus_icon.png";
import Router from "..";

export const Tarot = () => {
  return (
    <div className="main tarot">
      <h2>타로상담</h2>
      <div className="chat_container">
        <Router.Chatting />
        <div className="chatcard">
          <button>
            <h3>새로운 상담하기</h3>
            <img src={plus_icon} alt="새로운 상담 아이콘" />
          </button>
          <div className="card_container">
            <Router.ChatCard
              className="card tarot"
              h4="24.06.07"
              h3="상담중"
              p="이별 상담.."
            />
            <Router.ChatCard
              className="card tarot"
              h4="24.06.07"
              h3="상담중"
              p="이별 상담.."
            />
            <Router.ChatCard
              className="card tarot"
              h4="24.06.07"
              h3="상담중"
              p="이별 상담.."
            />
            <Router.ChatCard
              className="card tarot"
              h4="24.06.07"
              h3="상담중"
              p="이별 상담.."
            />
            <Router.ChatCard
              className="card tarot"
              h4="24.06.07"
              h3="상담중"
              p="이별 상담.."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
