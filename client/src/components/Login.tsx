import { useState } from 'react';

interface LoginProps {
  setUser: (user: string) => void;
}

export default function Login({ setUser }: LoginProps) {
  const [input, setInput] = useState<string>('');
  return (
    <div className="Login">
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') setUser(input);
        }}
        value={input}
        placeholder="username"
      />
      <button onClick={() => setUser(input)}>Join Chat</button>
    </div>
  );
}
