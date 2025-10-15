const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

// Add headers for audio streaming
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Accept-Ranges', 'bytes');
    next();
});

// Serve static files with proper MIME types
app.use(express.static(__dirname, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.mp3')) {
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
    }
}));

// Route chính
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Lấy địa chỉ IP local
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIP();
    console.log('\n🎉 ================================');
    console.log('✨ QUEEN\'S DAY SERVER RUNNING! ✨');
    console.log('================================ 🎉\n');
    console.log('📍 Truy cập từ máy này:');
    console.log(`   👉 http://localhost:${PORT}`);
    console.log(`   👉 http://127.0.0.1:${PORT}\n`);
    console.log('🌐 Truy cập từ máy khác (cùng mạng WiFi):');
    console.log(`   👉 http://${localIP}:${PORT}\n`);
    console.log('💡 Chia sẻ link trên cho bạn bè để họ xem!\n');
    console.log('⏹️  Nhấn Ctrl+C để dừng server\n');
});
