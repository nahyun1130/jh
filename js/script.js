const pieces = document.querySelectorAll('.puzzle-piece');
const slots = document.querySelectorAll('.puzzle-slot');

let activePiece = null;
let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;

pieces.forEach(piece => {
    piece.addEventListener('mousedown', e => {
        activePiece = piece;

        const rect = piece.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        startX = rect.left;
        startY = rect.top;

        piece.style.cursor = 'grabbing';
        piece.style.zIndex = 1000;
    });
});

document.addEventListener('mousemove', e => {
    if (!activePiece) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    activePiece.style.transform = `translate(${x - startX}px, ${y - startY}px)`;
});

document.addEventListener('mouseup', e => {
    if (!activePiece) return;

    const pieceRect = activePiece.getBoundingClientRect();
    let snapped = false;

    slots.forEach(slot => {
        const slotRect = slot.getBoundingClientRect();

        const distanceX = Math.abs(pieceRect.x - slotRect.x);
        const distanceY = Math.abs(pieceRect.y - slotRect.y);

        if (distanceX < 50 && distanceY < 50) {
            activePiece.style.transform = `translate(${slotRect.left - startX}px, ${slotRect.top - startY}px)`;
            snapped = true;
        }
    });

    if (!snapped) {
        activePiece.style.transform = 'none';
    }

    activePiece.style.cursor = 'grab';
    activePiece.style.zIndex = 1;
    activePiece = null;
});
