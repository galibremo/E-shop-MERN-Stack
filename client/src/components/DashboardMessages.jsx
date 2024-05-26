import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function DashboardMessages() {
  const { currentSeller, loading } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const { data } = await axios.get(
          `/api/conversation/get-all-conversation-seller/${currentSeller._id}`,
          {
            withCredentials: true,
          }
        );
        setConversations(data.conversations);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [currentSeller, messages]);

  useEffect(() => {
    if (currentSeller) {
      const sellerId = currentSeller?._id;
      socket.emit("addUser", sellerId);
      socket.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [currentSeller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find(
      (member) => member !== currentSeller?._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    if (online) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `/api/message/get-all-message/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentSeller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== currentSeller._id
    );

    socket.emit("sendMessage", {
      senderId: currentSeller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`/api/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socket.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: currentSeller._id,
    });

    await axios
      .put(`/api/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: currentSeller._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleImageSubmit(e) {}

  async function storeImage(file) {}

  const imageSendingHandler = async (e) => {};

  const updateLastMessageForImage = async () => {};

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <div
      className={`w-[90%] bg-white m-5 h-[85vh] rounded ${
        !open && "overflow-y-scroll"
      }`}
    >
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={currentSeller._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                loading={loading}
              />
            ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={currentSeller._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          setMessages={setMessages}
        />
      )}
    </div>
  );
}

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  loading,
}) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  useEffect(() => {
    const userId = data.members.find((user) => user != me);

    const getUser = async () => {
      try {
        const res = await axios.get(`/api/auth/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      }  cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${user?.avatar}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {!loading && data?.lastMessageId !== user?._id
            ? "You:"
            : user?.name.split(" ")[0] + ": "}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <div className="relative">
            <img
              src={userData?.avatar}
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />
            {activeStatus ? (
              <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
            ) : (
              <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
            )}
          </div>
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{activeStatus ? "Active Now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        {messages &&
          messages.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex w-full my-2 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                {item.sender !== sellerId && (
                  <img
                    src={userData?.avatar}
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                {item.imageUrls &&
                  item.imageUrls.map((imageUrl, index) => (
                    <img
                      key={index} // Important for performance with multiple elements
                      src={imageUrl}
                      className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                      alt="" // Add alt text for accessibility
                    />
                  ))}
                {item.text !== "" && (
                  <div>
                    <div
                      className={`w-max p-2 rounded ${
                        item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                      } text-[#fff] h-min`}
                    >
                      <p>{item.text}</p>
                    </div>

                    <p className="text-[12px] text-[#000000d3] pt-1">
                      {format(item.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* send message input */}

      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            multiple
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full border p-1 rounded-[5px]"
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};
