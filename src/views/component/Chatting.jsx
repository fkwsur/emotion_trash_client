import React, { useEffect, useState } from "react";
import counselor from "../../image/counselor.png";
import socketio from "socket.io-client";
const socket = socketio.connect("http://localhost:8081/");

export const Chatting = (props) => {
        const [chatList, setChatList] = useState("");
        const [chat, setChat] = useState("");

        useEffect(() => {
          List()
        })

        useEffect(() => {
          onRoomClick()
        },[])
      
        const List = async () => {
          await socket.on('chatting', (obj) => {
            setChatList(obj);
          });
          let mySpace = document.getElementById("scroll");
          mySpace.scrollTop = mySpace.scrollHeight;
        }

        const onRoomClick = async (k) => {
          await socket.emit('roomName', "현지");
        }


        // let sample_chat = [
        //   {
        //     user: "system",
        //     chat: "그럼 얼마든지 얘기해봐",
        //   },
        //   {
        //     user: "user",
        //     chat: "우울해 우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해우울해",
        //   },
        //   {
        //     user: "system",
        //     chat: "그럼 얼마든지 얘기해봐",
        //   },
        //   {
        //     user: "user",
        //     chat: "니가 고민 상담 해준다매",
        //   },
        //   {
        //     user: "system",
        //     chat: "오늘은 무슨 일로 찾아왔니? 나는 너의 고민을 도와주는 감쓰통이야 연애상담이라면 나에게 맡겨",
        //   },
        // ];
      
        // useEffect(() => {
        //       setChatList(sample_chat)
        // },[])
      
        const onSubmit = async(e) => {
          e.preventDefault();
          setChatList([...chatList,{
            role: "user",
            content: chat,
            }])
            await socket.emit('chat', chat);
            let mySpace = document.getElementById("scroll");
            mySpace.scrollTop = mySpace.scrollHeight;
            setChat("")
        };
      
        return (
          <>
            <div className="chatting">
              <div className="talk_wrap" id="scroll">
                {chatList ? chatList.map((k, i) => {
                      return (
                        <div className={`talk ${k.role}`}>
                          <img src={counselor} alt="상담원 이미지" />
                          <p>{k.content}</p>
                        </div>
                      );
                    })
                  : ""}
              </div>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  required
                />
                <button type="submit">전송</button>
              </form>
            </div>
          </>
        );
      };
      
      export const ChatCard = (props) => {
        return (
          <>
            <div className={props.className}>
              <div className="title">
                <h4>{props.h4}</h4>
                <h3>{props.h3}</h3>
              </div>
              <p className="memo">{props.p}</p>
            </div>
          </>
        );
      };