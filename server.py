import http.server
import socketserver
import socket

PORT = 3000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except:
        return "localhost"

with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
    local_ip = get_local_ip()
    print("\n" + "="*50)
    print("✨ QUEEN'S DAY SERVER RUNNING! ✨")
    print("="*50 + "\n")
    print("📍 Truy cập từ máy này:")
    print(f"   👉 http://localhost:{PORT}")
    print(f"   👉 http://127.0.0.1:{PORT}\n")
    print("🌐 Truy cập từ máy khác (cùng mạng WiFi):")
    print(f"   👉 http://{local_ip}:{PORT}\n")
    print("💡 Chia sẻ link trên cho bạn bè để họ xem!\n")
    print("⏹️  Nhấn Ctrl+C để dừng server\n")
    
    httpd.serve_forever()
