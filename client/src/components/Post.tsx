interface PostType {
  _id?: string;
  user: string;
  message: string;
  timestamp: string | Date;
}

interface PostProps {
  user: string;
  post: PostType;
}

export default function Post({ user, post }: PostProps) {
  const timestamp = new Date(post.timestamp);
  return (
    <div
      className={
        user.toLowerCase() === post.user.toLowerCase()
          ? `post userPost`
          : `post`
      }
    >
      <p className="postUser">{post.user}</p>
      <div className="postMessage">
        <p>{post.message}</p>
      </div>
      <p className="postUser" style={{ fontSize: '.5rem' }}>
        {timestamp.toLocaleString()}
      </p>
    </div>
  );
}
