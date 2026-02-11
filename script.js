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

// ... kode-kode lama abang (fungsi music, carousel, dll) ada di sini ...

// --- KODE CUSTOM CURSOR (TARUH DI PALING BAWAH) ---
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Titik kecil langsung nempel di ujung mouse
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Ekor lingkaran pakai animasi biar ada efek "smooth trailing"
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 400, fill: "forwards" }); // 400ms biar kerasa smooth-nya
});

// Fitur Tambahan: Kursor Membesar saat kena tombol/link
const interactiveElements = document.querySelectorAll("a, button, .card-3d, .nav-btn, .social-icon");
interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-hover");
        cursorDot.style.transform = "translate(-50%, -50%) scale(0.5)"; // Titik mengecil biar estetik
    });
    el.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-hover");
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
    });
});

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opsional: bikin garis timeline memanjang (harus tambah logika tinggi)
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

window.onscroll = function() { moveProgressBar() };

function moveProgressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

window.addEventListener("scroll", function() {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 50) { // Jika di-scroll lebih dari 50px
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
const audio = document.querySelector("audio"); // Sesuaikan dengan tag audio abang

let audioSource;
let analyser;

audio.addEventListener("play", function() {
    // Setup Audio Context (hanya jalan sekali)
    if (!audioSource) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioSource = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
    }

    analyser.fftSize = 128; // Jumlah batang (semakin besar semakin rapat)
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = canvas.width / bufferLength;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLength; i++) {
            let barHeight = dataArray[i] / 2; // Tinggi batang sesuai nada
            
            // Warna batang (Gradasi Neon)
            ctx.fillStyle = `rgb(0, 210, 255)`; // Warna Biru Neon
            
            // Gambar batangnya
            ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
        }
        requestAnimationFrame(animate);
    }
    animate();
});