const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

// CORSを許可
app.use(cors());

// JSONデータを扱うためにbody-parserを設定
app.use(bodyParser.json());

// セッション設定
app.use(session({
  secret: 'your-secret-key', 
  resave: false, 
  saveUninitialized: true, 
}));

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
// チケットデータの保存先のパス
const dataFilePath = path.join(dataDir, 'tickets.json');

if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]), 'utf8');
}

// チケット一覧を取得するAPI
app.get('/api/tickets', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

// チケットを追加するAPI
app.post('/api/tickets', (req, res) => {
  const newTicket = req.body;

  // 既存のチケットデータを読み込む
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }

    // 既存データをパース
    const tickets = JSON.parse(data);

    // 新しいチケットに一意のIDを付与
    const newId = tickets.length > 0 ? Math.max(...tickets.map(ticket => ticket.id)) + 1 : 1;
    const ticketWithId = { id: newId, ...newTicket };

    // 新しいチケットを追加
    tickets.push(ticketWithId)

    // 更新されたデータをファイルに書き込む
    fs.writeFile(dataFilePath, JSON.stringify(tickets, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Error saving data');
      }
      req.session.flashMessage = { type: 'success', message: 'チケットが正常に追加されました！' };
      res.status(201).json(newTicket);
    });
  });
});

// フラッシュメッセージを取得するAPI
app.get('/api/flash-message', (req, res) => {
  const flashMessage = req.session.flashMessage;
  if (flashMessage) {
    res.json(flashMessage);
    req.session.flashMessage = null;  // メッセージを一度送信したらクリア
  } else {
    res.status(404).json({ message: 'No flash message available' });
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
