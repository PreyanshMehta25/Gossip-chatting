import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages = [],
    getMessages,
    isMessagesLoading,
    selectedUser ,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser  } = useAuthStore();
  const messagesEndRef = useRef(null);

  // Get messages when selected user changes
  useEffect(() => {
    if (selectedUser ?._id) {
      getMessages(selectedUser ._id); // Ensure this fetches messages for both users
      subscribeToMessages(); // Ensure this updates the messages state on new messages

      return () => unsubscribeFromMessages();
    }
  }, [
    selectedUser ?._id, // Use optional chaining to avoid errors if selectedUser  is null
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messages.length > 0) { // Check if there are messages to scroll
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

const relevantMessages = messages.filter((message) => {
  const sender = message.senderId.toString();
  const receiver = message.receiverId.toString();
  const authId = authUser._id.toString();
  const selectedId = selectedUser._id.toString();

  return (
    (sender === authId && receiver === selectedId) ||
    (sender === selectedId && receiver === authId)
  );
});

const sortedMessages = relevantMessages.sort(
  (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
);
console.log({
  senderId: messages.senderId,
  receiverId: messages.receiverId,
  authId: authUser._id,
});


  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start chatting!</p>
          </div>
        ) : (
          sortedMessages.map((message) => {
            // Check if the message is sent by the authenticated user
            const isSentByMe = message.senderId === authUser ._id || message.senderId?._id === authUser ._id;
            return (
              <div
                key={message._id}
                className={`chat ${isSentByMe ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        isSentByMe
                          ? authUser .profilePic || "/avatar.png"
                          : selectedUser ?.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>

                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
