import { useState } from 'react';

interface InputFieldProps {
  user: string;
}

export default function InputField({ user }: InputFieldProps) {
  const [message, setMessage] = useState<string>('');

  const sendMessage = async () => {
    // ? Only send a message if the field is not empty
    if (message) {
      // ? This is fine to have before the try block since React batches state updates and handles them at the conclusion of the function
      setMessage('');
      try {
        const response = await fetch('http://localhost:8080/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
            message: message,
            timestamp: new Date(),
          }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };

  return (
    <div className="inputSection">
      <textarea
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent new line
            sendMessage();
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setMessage(e.target.value);
        }}
        value={message}
        placeholder="say something"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
