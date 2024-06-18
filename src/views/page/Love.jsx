import React, { useEffect, useState } from "react";
import { Chatting,ChatCard } from "../component/Chatting";
import plus_icon from "../../image/plus_icon.png";

export const Love = () => {
  return (
    <div className="main love">
        <h2>연애상담</h2>
        <div className="chat_container">
          <Chatting />
          <div className="chatcard">
            <button>
              <h3>새로운 상담하기</h3>
              <img src={plus_icon} alt="새로운 상담 아이콘" />
            </button>
            <div className="card_container">
              <ChatCard
                className="card love"
                h4="24.06.07"
                h3="상담중"
                p="이별 상담.."
              />
              <ChatCard
                className="card love"
                h4="24.06.07"
                h3="상담중"
                p="이별 상담.."
              />
              <ChatCard
                className="card love"
                h4="24.06.07"
                h3="상담중"
                p="이별 상담.."
              />
              <ChatCard
                className="card love"
                h4="24.06.07"
                h3="상담중"
                p="이별 상담.."
              />
              <ChatCard
                className="card love"
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

