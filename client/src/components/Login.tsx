import { useState } from 'react';

interface LoginProps {
  handleLogin: (user: string) => void;
}

export default function Login({ handleLogin }: LoginProps) {
  const [input, setInput] = useState<string>('');
  return (
    <div className="Login">
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleLogin(input);
        }}
        value={input}
        placeholder="username"
      />
      <button onClick={() =>handleLogin(input)}>Join Chat</button>
    </div>
  );
}
