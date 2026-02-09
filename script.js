/**
 * GEMINI AI COLLABORATION - FINAL UPDATED JS
 * Fitur: 3D Music Carousel (Cover Flow), Typing Effect, 3D Photo Throw, & Reveal Scroll
 */

// 1. FUNGSI UNTUK MEMUTAR LAGU
function playSong(songFile) {
    const audio = document.getElementById('audioPlayer');
    if (!audio) return;

    if (audio.src.includes(songFile) && !audio.paused) {
        audio.pause();
    } else {
        audio.src = songFile;
        audio.play().catch(error => {
            console.log("Audio play diblokir:", error);
            alert("Abangkuh, cek lagi file mp3 nya di folder ya!");
        });
    }
}

// 2. FUNGSI REVEAL (MUNCUL SAAT SCROLL)
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 50; 

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

// 3. TYPING EFFECT
const textElement = document.getElementById('typing');
const phrases = ["Cool Man.", "Mysterious Man.", "Mighty Man.", "Polite Man.", "Strong Man."];
let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 150;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 200;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true; typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

// 4. ANIMASI FOTO ABOUT (SPIN & THROW)
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const container = entry.target;
            container.style.gap = "0px"; 
            container.classList.add('animate');

            setTimeout(() => {
                container.style.gap = "25px";
                container.style.transition = "gap 0.5s ease-in-out";
            }, 1000); 
            aboutObserver.unobserve(container); 
        }
    });
}, { threshold: 0.3 });

// 5. LOGIKA 3D MUSIC CAROUSEL (REVISI COVER FLOW)
function init3DCarousel() {
    const cards = document.querySelectorAll('.card-3d');
    const nextBtn = document.querySelector('.btn-next');
    const prevBtn = document.querySelector('.btn-prev');
    let currentIndex = 0;

    if (cards.length === 0) return;

    function updateCarousel() {
        cards.forEach((card, i) => {
            // Reset class dasar
            card.className = 'card-3d hidden'; 

            if (i === currentIndex) {
                card.className = 'card-3d active';
            } else if (i === (currentIndex - 1 + cards.length) % cards.length) {
                card.className = 'card-3d left';
            } else if (i === (currentIndex + 1) % cards.length) {
                card.className = 'card-3d right';
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        });
    }

    // Klik langsung pada kartu untuk pindah
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    updateCarousel();
}

// 6. EVENT UTAMA SAAT HALAMAN DIBUKA
document.addEventListener('DOMContentLoaded', () => {
    // Jalankan Typing
    if(textElement) type();
    
    // Jalankan 3D Music
    init3DCarousel();

    // Beri class reveal otomatis ke elemen penting
    document.querySelectorAll('section, .info-card, .about-photos img, .hero-content, .song-box').forEach(el => {
        el.classList.add('reveal');
    });

    // Cek reveal pertama kali (biar gak kosong)
    setTimeout(reveal, 200);

    // Jalankan Observer About
    const aboutPhotos = document.querySelector('.about-photos');
    if (aboutPhotos) aboutObserver.observe(aboutPhotos);

    // Efek Getar Ikon Sosmed
    const contactIcons = document.querySelectorAll('.social-icon');
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'shake 0.5s ease';
        });
        icon.addEventListener('animationend', () => {
            icon.style.animation = '';
        });
    });
});

// 7. EVENT SAAT SCROLL
window.addEventListener('scroll', () => {
    // Navbar effect
    const nav = document.querySelector('nav');
    if(nav) {
        window.scrollY > 50 ? nav.style.padding = '10px 8%' : nav.style.padding = '20px 8%';
    }

    // Jalankan reveal on scroll
    reveal();
});
