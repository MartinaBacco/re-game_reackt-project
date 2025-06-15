import { useEffect, useState, useRef, useCallback, useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
  const { session } = useContext(SessionContext);
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messageRef = useRef(null);

  const scrollSmoothToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const getInitialMessages = useCallback(async () => {
    setLoadingInitial(true);
    const { data: messages, error } = await supabase
      .from("messages")
      .select()
      .eq("game_id", data?.id)
      .order("updated_at", { ascending: true });

    if (error) {
      setError(error.message);
      setLoadingInitial(false);
      return;
    }
    setMessages(messages);
    setLoadingInitial(false);
  }, [data?.id]);

  useEffect(() => {
    if (data) {
      getInitialMessages();
    }
  }, [data, getInitialMessages]);

  useEffect(() => {
    scrollSmoothToBottom();
  }, [messages]);


  const sendMessage = async () => {
    if (!session) {
      alert("Devi essere loggato per inviare messaggi");
      return;
    }
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("messages").insert([
      {
        content: newMessage.trim(),
        profile_id: session.user.id,
        profile_username: session.user.email,
        game_id: data.id,
      },
    ]);

    if (error) {
      setError(error.message);
      return;
    }

    setNewMessage("");
    getInitialMessages(); 
  };

  if (!session) {
    return (
      <div className="alert alert-warning shadow-lg max-w-md mx-auto mt-8">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Devi essere loggato per usare la chat.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto h-[60vh] bg-base-200 rounded-lg shadow-md overflow-hidden">
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        ref={messageRef}
      >
        {loadingInitial && (
          <progress className="progress w-full"></progress>
        )}

        {error && (
          <div className="alert alert-error shadow-lg">
            <div>{error}</div>
          </div>
        )}

        {messages.length === 0 && !loadingInitial && (
          <p className="text-center text-sm text-base-content/60">
            Nessun messaggio
          </p>
        )}

        {messages.map((message) => {
          const isMine = message.profile_id === session.user.id;
          return (
            <div
              key={message.id}
              className={`chat ${isMine ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                  {message.profile_username
                    ? message.profile_username.charAt(0).toUpperCase()
                    : "U"}
                </div>
              </div>
              <div className="chat-bubble">{message.content}</div>
              <time className="chat-footer opacity-60 text-xs mt-1">
                {dayjs().to(dayjs(message.updated_at))}
              </time>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-base-300 flex gap-3 items-center">
        <input
          type="text"
          placeholder="Scrivi un messaggio..."
          className="input input-bordered input-primary flex-grow"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          className="btn btn-primary"
          disabled={newMessage.trim() === ""}
          onClick={sendMessage}
        >
          Invia
        </button>
      </div>
    </div>
  );
}