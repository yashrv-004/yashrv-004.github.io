document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.comparison-container');

    containers.forEach(container => {
        const slider = container.querySelector('.slider-handle');
        const afterImage = container.querySelector('.image-after');
        let isDragging = false;

        const startDrag = () => {
            isDragging = true;
            document.body.style.cursor = 'ew-resize';
        };

        const stopDrag = () => {
            isDragging = false;
            document.body.style.cursor = 'default';
        };

        const handleMove = (e) => {
            if (!isDragging) return;

            const rect = container.getBoundingClientRect();
            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            let position = clientX - rect.left;

            // Clamp position within container bounds
            if (position < 0) position = 0;
            if (position > rect.width) position = rect.width;

            const percentage = (position / rect.width) * 100;

            slider.style.left = percentage + '%';
            afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        };

        // Desktop events
        slider.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', handleMove);

        // Mobile events
        slider.addEventListener('touchstart', startDrag, { passive: true });
        document.addEventListener('touchend', stopDrag);
        document.addEventListener('touchmove', handleMove, { passive: true });
    });
});
