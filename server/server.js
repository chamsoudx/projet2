const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/ask-ai', async (req, res) => {
  const userQuery = req.body.query;

  if (!userQuery) {
    return res.status(400).json({ answer: 'لم يتم إرسال استفسار.' });
  }

  try {
    const aiResponse = await getAIResponse(userQuery);
    res.json({ answer: aiResponse });
  } catch (error) {
    console.error('Error handling AI request:', error);
    res.status(500).json({ answer: 'حدث خطأ أثناء معالجة طلبك. حاول مرة أخرى لاحقًا.' });
  }
});

const getAIResponse = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`لقد قلت: "${query}". كيف يمكنني مساعدتك أكثر؟`);
    }, 1000);
  });
};

app.listen(port, () => {
  console.log(`AI Chat API يعمل على: http://localhost:${port}`);
});
