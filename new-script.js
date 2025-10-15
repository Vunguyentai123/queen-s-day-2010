// Quotes for animation
const quotes = [
    "💎 BE BOLD. BE BEAUTIFUL. BE YOU. 💎",
    "✨ QUEENS DON'T COMPETE ✨",
    "👑 CROWN YOURSELF 👑",
    "💫 UNSTOPPABLE ENERGY 💫",
    "🌟 SHINE LIKE A STAR 🌟",
    "🔥 FEARLESS & FABULOUS 🔥"
];

let currentQuoteIndex = 0;
let isTyping = false;

// Type writer effect for quotes
function typeWriter(text, element, speed = 50) {
    if (isTyping) return;
    isTyping = true;
    
    let i = 0;
    element.textContent = '';
    
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            isTyping = false;
            setTimeout(nextQuote, 3000);
        }
    }, speed);
}

function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    const quoteElement = document.getElementById('quote');
    typeWriter(quotes[currentQuoteIndex], quoteElement);
}

// Matrix rain effect
function initMatrix() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = '01👑💎✨🌸💖';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00f5ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Cursor trail effect
function initCursorTrail() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#ff006e', '#00f5ff', '#8338ec', '#ffbe0b'];
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = 1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.02;
            if (this.size > 0.2) this.size -= 0.1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    window.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 3D card tilt effect
function init3DCard() {
    const card = document.getElementById('card3d');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            translateY(0) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1.05)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
}

// Counter animation
function animateCounter(id, target, duration = 2000) {
    const element = document.getElementById(id);
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Fireworks effect
function explodeConfetti() {
    const count = 100;
    const colors = ['#ff006e', '#00f5ff', '#8338ec', '#ffbe0b', '#ff9800'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 10 + Math.random() * 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += vx;
            y += vy + 0.5;
            opacity -= 0.02;
            
            confetti.style.transform = `translate(${x}px, ${y}px)`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        animate();
    }
    
    // Add screen shake
    document.body.style.animation = 'shake 0.5s';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// Show message modal
function showMessage() {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    
    const messages = [
        "Bạn là một QUEEN thực thụ! 👑<br>Mạnh mẽ, tự tin và không gì có thể ngăn cản bạn!",
        "Hôm nay là ngày của bạn! 💎<br>Hãy tỏa sáng và khiến cả thế giới phải ngước nhìn!",
        "Phụ nữ như bạn chính là nguồn cảm hứng! ✨<br>Keep being AWESOME!",
        "YOU ARE UNSTOPPABLE! 🔥<br>Không có giới hạn nào cho sức mạnh của bạn!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    modalText.innerHTML = randomMessage;
    modal.classList.remove('hidden');
    
    // Create particles around modal
    createModalParticles();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}

function createModalParticles() {
    const emojis = ['👑', '💎', '✨', '🌟', '💖', '🔥', '💫'];
    const container = document.getElementById('floatingEmojis');
    
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 10000);
    }
}

// HTML5 Audio Player - Chỉ phát nhạc, không video
let musicPlaying = false;
let audio = null;
let musicControl = null;
let firstInteraction = true; // Track first user interaction

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    audio = document.getElementById('backgroundMusic');
    musicControl = document.getElementById('musicControl');
    
    // Set initial volume
    if (audio) {
        audio.volume = 0.8;
    }
    
    // Preload audio on first user interaction
    document.addEventListener('click', function initAudio() {
        if (audio && firstInteraction) {
            console.log('🎯 First interaction detected - initializing audio context');
            audio.load();
            firstInteraction = false;
            // Remove listener after first interaction
            document.removeEventListener('click', initAudio);
        }
    }, { once: true });
    
    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    
    if (volumeSlider && volumeValue && audio) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audio.volume = volume;
            volumeValue.textContent = e.target.value + '%';
        });
    }
    
    // Audio error handling
    if (audio) {
        audio.addEventListener('error', (e) => {
            console.error('❌ Audio error:', e);
            console.error('Audio error code:', audio.error?.code);
            console.error('Audio error message:', audio.error?.message);
            console.error('Current src:', audio.currentSrc);
            
            let errorMsg = 'Lỗi tải nhạc';
            if (audio.error) {
                switch(audio.error.code) {
                    case 1: errorMsg = 'Tải file bị hủy'; break;
                    case 2: errorMsg = 'Lỗi mạng khi tải'; break;
                    case 3: errorMsg = 'File nhạc bị lỗi'; break;
                    case 4: errorMsg = 'Không tìm thấy file'; break;
                }
            }
            createNotification('❌ ' + errorMsg + ' - Đang thử source khác...');
        });
        
        audio.addEventListener('loadeddata', () => {
            console.log('✅ Music loaded successfully');
            console.log('Duration:', audio.duration);
            console.log('Source:', audio.currentSrc);
        });
        
        audio.addEventListener('loadstart', () => {
            console.log('🔄 Loading audio from:', audio.currentSrc);
        });
        
        audio.addEventListener('canplay', () => {
            console.log('✅ Audio can play - ready!');
        });
    }
});

function playMusic() {
    if (!audio || !musicControl) {
        console.error('❌ Audio player not found!');
        createNotification('❌ Lỗi: Không tìm thấy audio player!');
        return;
    }
    
    if (!musicPlaying) {
        console.log('📱 Attempting to play music...');
        console.log('Audio src:', audio.src);
        console.log('Audio readyState:', audio.readyState);
        console.log('Audio networkState:', audio.networkState);
        
        // Try to load first
        audio.load();
        
        // Play music with better error handling
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Show control panel
                musicControl.classList.remove('hidden');
                
                // Update button
                const btn = document.getElementById('musicBtn');
                if (btn) {
                    btn.querySelector('.btn-text').textContent = '⏸️ PAUSE';
                    btn.querySelector('.btn-glitch').textContent = '⏸️ PAUSE';
                }
                
                musicPlaying = true;
                startVisualizer();
                createNotification('🎵 Music Playing!');
                console.log('✅ Music started successfully');
            }).catch(error => {
                console.error('❌ Error playing music:', error);
                console.error('Error name:', error.name);
                console.error('Error message:', error.message);
                
                let errorMsg = '❌ Không thể phát nhạc!\n\n';
                
                if (error.name === 'NotAllowedError') {
                    errorMsg += '📱 Trình duyệt chặn autoplay\n' +
                               '✅ Giải pháp: Click nút MUSIC lần nữa';
                    createNotification('📱 Click lại nút MUSIC để phát nhạc');
                } else if (error.name === 'NotSupportedError') {
                    errorMsg += '❌ File nhạc không được hỗ trợ';
                    createNotification('❌ File nhạc không hỗ trợ');
                } else if (error.name === 'AbortError') {
                    errorMsg += '⏸️ Đang tải nhạc, vui lòng đợi...';
                    createNotification('⏳ Đang tải nhạc...');
                } else {
                    errorMsg += '❌ Lỗi: ' + error.message;
                    createNotification('❌ Lỗi: ' + error.message);
                }
                
                console.error(errorMsg);
            });
        }
    } else {
        // Pause music
        togglePlayPause();
    }
}

function togglePlayPause() {
    if (!audio) return;
    
    if (audio.paused) {
        audio.play();
        document.getElementById('playPauseBtn').textContent = '⏸️';
        const btn = document.getElementById('musicBtn');
        if (btn) {
            btn.querySelector('.btn-text').textContent = '⏸️ PAUSE';
            btn.querySelector('.btn-glitch').textContent = '⏸️ PAUSE';
        }
        musicPlaying = true;
        startVisualizer();
        createNotification('▶️ Music Resumed');
    } else {
        audio.pause();
        document.getElementById('playPauseBtn').textContent = '▶️';
        const btn = document.getElementById('musicBtn');
        if (btn) {
            btn.querySelector('.btn-text').textContent = '🎵 MUSIC';
            btn.querySelector('.btn-glitch').textContent = '🎵 MUSIC';
        }
        musicPlaying = false;
        createNotification('⏸️ Music Paused');
    }
}

function stopMusic() {
    if (!audio || !musicControl) return;
    
    // Stop music
    audio.pause();
    audio.currentTime = 0;
    
    // Hide control panel
    musicControl.classList.add('hidden');
    
    // Reset button
    const btn = document.getElementById('musicBtn');
    if (btn) {
        btn.querySelector('.btn-text').textContent = '🎵 MUSIC';
        btn.querySelector('.btn-glitch').textContent = '🎵 MUSIC';
    }
    
    document.getElementById('playPauseBtn').textContent = '▶️';
    
    // Stop visualizer
    musicPlaying = false;
    document.getElementById('strength').textContent = '100';
    document.getElementById('beauty').textContent = '100';
    document.getElementById('power').textContent = '100';
    
    createNotification('⏹️ Music Stopped');
    console.log('⏹️ Music stopped');
}

// Create notification
function createNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff006e, #8338ec);
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        font-size: 1.2em;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(255, 0, 110, 0.5);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);

function startVisualizer() {
    const stats = document.querySelectorAll('.stat-value');
    let animationId;
    
    function animate() {
        if (!musicPlaying) {
            // Reset về giá trị ban đầu
            stats.forEach(stat => stat.textContent = '100');
            cancelAnimationFrame(animationId);
            return;
        }
        
        stats.forEach(stat => {
            const current = parseInt(stat.textContent);
            const change = Math.floor(Math.random() * 15) - 7;
            const newValue = Math.max(90, Math.min(100, current + change));
            stat.textContent = newValue;
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Easter egg
let clickCount = 0;
function activateEasterEgg() {
    clickCount++;
    
    if (clickCount === 5) {
        alert('🎊 ULTRA SECRET UNLOCKED! 🎊\n\nBạn đã tìm ra bí mật!\nBạn là một LEGEND! 👑✨');
        
        // Rainbow effect
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
            clickCount = 0;
        }, 10000);
    }
}

// Floating particles background
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
    }
}

// Shake animation for body
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translate(0, 0); }
        10%, 30%, 50%, 70%, 90% { transform: translate(-10px, 0); }
        20%, 40%, 60%, 80% { transform: translate(10px, 0); }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize everything when page loads
window.addEventListener('load', () => {
    typeWriter(quotes[0], document.getElementById('quote'));
    initMatrix();
    initCursorTrail();
    init3DCard();
    createParticles();
    
    // Animate stats
    setTimeout(() => {
        animateCounter('strength', 100, 2000);
        animateCounter('beauty', 100, 2500);
        animateCounter('power', 100, 3000);
    }, 500);
});

// Close modal on click outside
document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

// Resize handler
window.addEventListener('resize', () => {
    const canvas = document.getElementById('canvas');
    const matrix = document.getElementById('matrix');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;
});
