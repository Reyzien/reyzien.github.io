function openModal(card) {
    const modal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");
    
    modalBody.innerHTML = card.innerHTML;
    
    const imgs = modalBody.querySelectorAll('img');
    imgs.forEach(img => {
        img.style.pointerEvents = "auto";
        img.onclick = () => openLightbox(img.src);
    });

    const viewer = modalBody.querySelector('.image-viewer');
    if (viewer) {
        const arrows = modalBody.querySelectorAll('.nav-arrow');
        arrows.forEach(arrow => {
            const dir = arrow.classList.contains('left') ? -1 : 1;
            arrow.onclick = (e) => changeSlide(e, arrow, dir);
        });
    }

    modal.style.display = "flex";
    document.body.classList.add("modal-open");
}

function closeModal() {
    document.getElementById("project-modal").style.display = "none";
    document.body.classList.remove("modal-open");
}

function openLightbox(src) {
    const lb = document.getElementById("image-lightbox");
    document.getElementById("lightbox-img").src = src;
    lb.style.display = "flex";
}

function closeLightbox() {
    document.getElementById("image-lightbox").style.display = "none";
}

function changeSlide(e, btn, dir) {
    if(e) e.stopPropagation();

    const viewer = btn.closest('.image-viewer');
    const list = viewer.querySelector('.image-list');
    const imgs = list.querySelectorAll('img');
    
    let idx = parseInt(viewer.dataset.idx) || 0;
    idx += dir;

    if (idx >= imgs.length) idx = 0;
    if (idx < 0) idx = imgs.length - 1;
    
    viewer.dataset.idx = idx;
    list.style.transform = `translateX(-${idx * 100}%)`;
}

const track = document.querySelector(".projects-track");
let isDown = false, startX, scrollL;

track.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollL = track.scrollLeft;
});
track.addEventListener("mouseleave", () => isDown = false);
track.addEventListener("mouseup", () => isDown = false);
track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollL - walk;
});

const container = document.getElementById("seasonal-effects");
if (new Date().getMonth() === 11 || new Date().getMonth() === 0) {
    for (let i = 0; i < 20; i++) {
        const s = document.createElement("div");
        s.style.cssText = `position:absolute;color:#fff;top:-20px;left:${Math.random()*100}vw;
        animation:fall ${Math.random()*5+5}s linear infinite;opacity:0.6;pointer-events:none;`;
        s.innerHTML = "❄";
        container.appendChild(s);
    }
}
const style = document.createElement('style');
style.innerHTML = "@keyframes fall { to { transform: translateY(105vh) rotate(360deg); } }";
document.head.appendChild(style);