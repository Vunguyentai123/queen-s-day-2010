// Quotes for animation
const quotes = [
    "💎 BE BOLD. BE BEAUTIFUL. BE YOU. 💎",
    "✨ WOMEN DON'T COMPETE ✨",
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
            setTimeout(nextQuote, 3010);
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
    
    const letters = '01�💎✨🌸💖';
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

function explodeConfetti() {
    const count = 60;
    const flowerEmojis = ['🌸', '🌺', '🌻', '🌼', '🌷', '💐', '🏵️', '🌹', '💮'];
    const hearts = ['💖', '💗', '💓', '💕', '💝'];
    const sparkles = ['✨', '⭐', '🌟', '💫'];
    const allEmojis = [...flowerEmojis, ...hearts, ...sparkles];
    
    const fragment = document.createDocumentFragment();
    const confettiElements = [];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = allEmojis[Math.floor(Math.random() * allEmojis.length)];
        confetti.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            font-size: ${Math.random() * 20 + 25}px;
            pointer-events: none;
            z-index: 10000;
            user-select: none;
            will-change: transform, opacity;
        `;
        
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 15 + Math.random() * 12;
        
        confettiElements.push({
            element: confetti,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            x: 0,
            y: 0,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 18,
            opacity: 1
        });
        
        fragment.appendChild(confetti);
    }
    
    document.body.appendChild(fragment);
    
    const animate = () => {
        let activeCount = 0;
        
        confettiElements.forEach(item => {
            if (item.opacity <= 0) return;
            
            item.vx *= 0.985;
            item.vy += 0.6;
            item.x += item.vx;
            item.y += item.vy;
            item.rotation += item.rotationSpeed;
            item.opacity -= 0.0095;
            
            item.element.style.transform = `translate(${item.x}px, ${item.y}px) rotate(${item.rotation}deg)`;
            item.element.style.opacity = item.opacity;
            
            if (item.opacity > 0 && item.y < window.innerHeight + 100) {
                activeCount++;
            } else {
                item.element.remove();
            }
        });
        
        if (activeCount > 0) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
    
    document.body.style.animation = 'shake 0.5s';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

let currentMessageIndex = 0;

function showMessage() {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    
    const messages = [
        "Bạn là một WOMAN thực thụ! 👑<br>Mạnh mẽ, tự tin và không gì có thể ngăn cản bạn!",
        "Hôm nay là ngày của bạn! 💎<br>Hãy tỏa sáng và khiến cả thế giới phải ngước nhìn!",
        "Phụ nữ như bạn chính là nguồn cảm hứng! ✨<br>Keep being AWESOME!",
        "YOU ARE UNSTOPPABLE! 🔥<br>Không có giới hạn nào cho sức mạnh của bạn!"
    ];
    
    currentMessageIndex = 0;
    
    modalText.innerHTML = messages[currentMessageIndex];
    modal.classList.remove('hidden');
    
    updateNavigationButton();
    
    createModalParticles();
}

function nextMessage() {
    const modalText = document.getElementById('modalText');
    
    const messages = [
        "Bạn là một WOMAN thực thụ! 👑<br>Mạnh mẽ, tự tin và không gì có thể ngăn cản bạn!",
        "Hôm nay là ngày của bạn! 💎<br>Hãy tỏa sáng và khiến cả thế giới phải ngước nhìn!",
        "Phụ nữ như bạn chính là nguồn cảm hứng! ✨<br>Keep being AWESOME!",
        "YOU ARE UNSTOPPABLE! 🔥<br>Không có giới hạn nào cho sức mạnh của bạn!"
    ];
    
    if (currentMessageIndex < messages.length - 1) {
        currentMessageIndex++;
        
        modalText.style.opacity = '0';
        setTimeout(() => {
            modalText.innerHTML = messages[currentMessageIndex];
            modalText.style.opacity = '1';
        }, 200);
        
        updateNavigationButton();
    } else {
        closeModal();
    }
}

function updateNavigationButton() {
    const messages = [
        "Bạn là một WOMAN thực thụ! 👑<br>Mạnh mẽ, tự tin và không gì có thể ngăn cản bạn!",
        "Hôm nay là ngày của bạn! 💎<br>Hãy tỏa sáng và khiến cả thế giới phải ngước nhìn!",
        "Phụ nữ như bạn chính là nguồn cảm hứng! ✨<br>Keep being AWESOME!",
        "YOU ARE UNSTOPPABLE! 🔥<br>Không có giới hạn nào cho sức mạnh của bạn!"
    ];
    
    const navButton = document.getElementById('messageNavBtn');
    
    if (!navButton) return;
    
    if (currentMessageIndex < messages.length - 1) {
        navButton.innerHTML = '→';
        navButton.style.bottom = '20px';
        navButton.style.right = '20px';
        navButton.style.top = 'auto';
    } else {
        navButton.innerHTML = '✕';
        navButton.style.top = '20px';
        navButton.style.right = '20px';
        navButton.style.bottom = 'auto';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    currentMessageIndex = 0;
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

let musicPlaying = false;
let audio = null;
let musicControl = null;
let firstInteraction = true;

document.addEventListener('DOMContentLoaded', () => {
    audio = document.getElementById('backgroundMusic');
    musicControl = document.getElementById('musicControl');
    
    // Set initial volume
    if (audio) {
        audio.volume = 0.8;
    }
    
    document.addEventListener('click', function initAudio() {
        if (audio && firstInteraction) {
            console.log('🎯 First interaction detected - initializing audio context');
            audio.load();
            firstInteraction = false;
            document.removeEventListener('click', initAudio);
        }
    }, { once: true });
    
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    
    if (volumeSlider && volumeValue && audio) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audio.volume = volume;
            volumeValue.textContent = e.target.value + '%';
        });
    }
    
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
        
        audio.load();
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicControl.classList.remove('hidden');
                
                const btn = document.getElementById('musicBtn');
                if (btn) {
                    btn.querySelector('.btn-text').textContent = '⏸️ PAUSE';
                    btn.querySelector('.btn-glitch').textContent = '⏸️ PAUSE';
                }
                
                musicPlaying = true;
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
    
    audio.pause();
    audio.currentTime = 0;
    
    musicControl.classList.add('hidden');
    
    const btn = document.getElementById('musicBtn');
    if (btn) {
        btn.querySelector('.btn-text').textContent = '🎵 MUSIC';
        btn.querySelector('.btn-glitch').textContent = '🎵 MUSIC';
    }
    
    document.getElementById('playPauseBtn').textContent = '▶️';
    
    musicPlaying = false;
    
    createNotification('⏹️ Music Stopped');
    console.log('⏹️ Music stopped');
}

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

let clickCount = 0;
function activateEasterEgg() {
    clickCount++;
    
    if (clickCount === 5) {
        alert('🎊 ULTRA SECRET UNLOCKED! 🎊\n\nBạn đã tìm ra bí mật!\nBạn là một LEGEND! 👑✨');
        
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
            clickCount = 0;
        }, 10000);
    }
}

function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 100;
    const emojis = ['🌸', '💐', '✨', '💖', '💎', '🌺', '🦋'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.fontSize = (Math.random() * 15 + 10) + 'px';
        particle.style.opacity = '0.6';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.pointerEvents = 'none';
        
        container.appendChild(particle);
    }
}

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

window.addEventListener('load', () => {
    typeWriter(quotes[0], document.getElementById('quote'));
    initMatrix();
    initCursorTrail();
    init3DCard();
    createParticles();
});

document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

window.addEventListener('resize', () => {
    const canvas = document.getElementById('canvas');
    const matrix = document.getElementById('matrix');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;
});
