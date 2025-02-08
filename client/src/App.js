import React, { useState } from 'react';

const App = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'مرحبًا! كيف يمكنني مساعدتك اليوم؟' }]);
  const [userInput, setUserInput] = useState('');

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages([...messages, userMessage]);
    setUserInput('');

    const botResponse = await fetchAIResponse(userInput);
    setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
  };

  const fetchAIResponse = async (input) => {
    try {
      const response = await fetch('https://your-api.onrender.com/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });
      const data = await response.json();
      return data.answer || 'عذرًا، لم أفهم سؤالك. حاول مرة أخرى.';
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. حاول مرة أخرى لاحقًا.';
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>محادثة مع الذكاء الاصطناعي</h1>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'bot' ? 'left' : 'right', margin: 5 }}>
            <span style={{ background: msg.sender === 'bot' ? '#e1f5fe' : '#dcedc8', padding: 8, borderRadius: 5 }}>{msg.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="اكتب رسالتك هنا..."
        style={{ width: '80%', marginRight: 10 }}
      />
      <button onClick={handleSend}>إرسال</button>
    </div>
  );
};

export default App;
