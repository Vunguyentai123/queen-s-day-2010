function showSurprise() {
    const surprise = document.getElementById('surprise');
    surprise.classList.remove('hidden');
    
    // Tạo hiệu ứng confetti
    createConfetti();
}

function closeSurprise() {
    const surprise = document.getElementById('surprise');
    surprise.classList.add('hidden');
}

function createConfetti() {
    const colors = ['#e91e63', '#9c27b0', '#ff9800', '#4caf50', '#2196f3'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const duration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            {
                transform: `translateY(0px) translateX(0px) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight + 10}px) translateX(${xMovement}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Thêm hiệu ứng khi di chuột vào card
document.querySelector('.card').addEventListener('mousemove', (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
});

document.querySelector('.card').addEventListener('mouseleave', (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
});

// Đóng popup khi click bên ngoài
document.getElementById('surprise').addEventListener('click', (e) => {
    if (e.target.id === 'surprise') {
        closeSurprise();
    }
});

// Hiệu ứng tuyết rơi (có thể thay bằng hoa anh đào)
function createPetals() {
    setInterval(() => {
        const petal = document.createElement('div');
        petal.textContent = '🌸';
        petal.style.position = 'fixed';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = '-50px';
        petal.style.fontSize = (Math.random() * 20 + 20) + 'px';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = '0';
        
        document.body.appendChild(petal);
        
        const duration = Math.random() * 5 + 5;
        const xMovement = (Math.random() - 0.5) * 100;
        
        petal.animate([
            {
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: petal.style.opacity
            },
            {
                transform: `translateY(${window.innerHeight + 50}px) translateX(${xMovement}px) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });
        
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }, 300);
}

// Bắt đầu hiệu ứng hoa rơi
createPetals();
