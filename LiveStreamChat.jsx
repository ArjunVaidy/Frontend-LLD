/**
 * So many messages will be there, we can't show every message
 * Not every message is required to be shown
 * Should it be shown real time? No real time is not required - we are okay with near real time (5-10 seconds delay)
 * If the streaming is for long time, there will be more messages - page size can explode if we keep pushing all messages to chat.HTML DOM size will increase
 * Since near real time is okay, we can show use polling to get messages - webSockets are not required
 */

/**
 * Limitations of webSockets
 * See there are many servers spread out for single service
 * If we have so many users, we need to scale to up the servers
 * If web sockets are used, we need one to one mapping - i.e once a user is connected to a server, he should be connected to the same server
 * But in case of api calls, we can have load balancer to distribute the load to different servers
 */

const LiveChat = () => {
  return (
    // give flex and direction to row
    <div>
      <VideoStream />
      <ChatWindow />
    </div>
  );
};

export default LiveChat;

const CHAT_MESSAGES_LIMIT = 100; // we can't show all messages, more HTML DOM size --> page will hang and explode
const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John",
      photo: "https://randomuser.me/api/portraits",
      message: "Hello",
    },
    {
      id: 2,
      name: "Dow",
      photo: "https://randomuser.me/api/portraits",
      message: "Hello2",
    },
    {
      id: 3,
      name: "Henry",
      photo: "https://randomuser.me/api/portraits",
      message: "Hello3",
    },
  ]);

  // make api call and get data
  const fetchData = () => {
    // make api call
    setMessages((messages) => {
      let newMessagesList = [...data, ...messages];
      newMessagesList = newMessagesList.slice(0, CHAT_MESSAGES_LIMIT); // to reduce the DOM size of the page as the live chat messages goes up
      return newMessagesList;
    });
  };

  useEffect(() => {
    const s = setInterval(fetchData, 1000);

    return () => clearInterval(s);
  }, []);
  return (
    // give flex direction as column reverse(to have latest messages at the top) and give scroll in y axis
    <div>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          name={message.name}
          photo={message.photo}
          message={message.message}
        />
      ))}
    </div>
  );
};
export default ChatWindow;

const ChatMessage = ({ name, photo, message }) => {
  return (
    <div>
      <img src={photo} alt={name} />
      <p>
        <span>{name}</span>
        <span>{message}</span>
      </p>
    </div>
  );
};
export default ChatMessage;

const VideoStream = () => {
  return (
    <div>
      <iframe
        width="1200"
        height="600"
        src="https://www.youtube.com/embed/XYdQ9JHCds4?si=vJ8sqlnwVt0vvRbQ"
        title="YouTube video player"
        // frameborder="0" - this will work only in HTML and not JSX
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // referrerpolicy="strict-origin-when-cross-origin" - this will work only in HTML and not JSX
        // allowfullscreen - this will work only in HTML and not JSX
      ></iframe>
    </div>
  );
};
export default VideoStream;


