import { useEffect, useRef, useState } from 'react';
import Post from './components/Post';
import InputField from './components/InputField';
import Login from './components/Login';

interface PostType {
  _id?: string;
  user: string;
  message: string;
  timestamp: string | Date;
}

const App = () => {
  const [user, setUser] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);

  const getMessages = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: PostType[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // ? useEffect to to retrieve messages from database on mount
  useEffect(() => {
    getMessages();
  }, []);

  // ? useEffect to open WebSocket connection (handshake) on mount
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      // console.log('Connected to WebSocket server');
      socket.send('Hello from client');
    };
    // ? When the server receives a message - in this case a new chat post - it adds that post directly to the client's [post] state, rerendering the componenet.
    socket.onmessage = (event: MessageEvent) => {
      const newPost: PostType = JSON.parse(event.data);
      setPosts((prev) => [...prev, newPost]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
    // ? Closes WebSocket on dismount
    return () => {
      socket.close();
    };
  }, []);

  // ? useRef getting hold of the 'chatWindow' section in order to scroll to the bottom on mount.
  const chatRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [user, posts]);

  // ? Using LocalStorage for persistent Login
  const handleLogin = (username:string) => {
    setUser(username)
    // set localStorage
    localStorage.setItem('user', username)
  }

  // check for user in Local Storage on mount
  useEffect(()=> {
    const user = localStorage.getItem('user')
    if (user) setUser(user)
  },[])
  
  // handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');

  }


  if (user) {
    return (
      <div className="App">
        <header className="header">
          <h3>{`Welcome, ${user}`}</h3>
          <button onClick={handleLogout}> Logout</button>
        </header>
        <section ref={chatRef} className="chatWindow">
          {posts.map((post, i) => (
            <Post user={user} post={post} key={post._id ?? i} />
          ))}
        </section>
        <InputField user={user} />
      </div>
    );
  } else {
    return <Login handleLogin={handleLogin} />;
  }
};

export default App;
