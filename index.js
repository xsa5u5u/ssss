// Gerekli kütüphaneleri dahil ediyoruz
const express = require('express');
const axios = require("axios");

// Express sunucusunu başlatıyoruz
const app = express();
// Render'ın bize verdiği portu veya varsayılan olarak 3000'i kullanıyoruz
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot aktif ve Render üzerinde çalışıyor!");
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda dinleniyor.`);
});

// Render'ın "Environment" bölümünden gizli bilgileri alıyoruz
const token = process.env.TOKEN;
const channelId = process.env.CHANNEL_ID;
const message = process.env.MESSAGE;

// Bilgilerin eksik olup olmadığını kontrol et
if (!token || !channelId || !message) {
    console.error("HATA: Environment (gizli değişkenler) bölümünde TOKEN, CHANNEL_ID veya MESSAGE eksik!");
} else {
    // Her 10 saniyede bir mesaj gönder
    setInterval(sendMessage, 10000);
}

function sendMessage() {
  axios.post(`https://discord.com/api/v9/channels/${channelId}/messages`, {
    content: message
  }, {
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    }
  }).then(() => {
    console.log(`✅ Mesaj başarıyla gönderildi: "${message}"`);
  }).catch((err) => {
    console.error("❌ Mesaj gönderilemedi. Hata:", err.response?.status, err.response?.data);
  });
}
