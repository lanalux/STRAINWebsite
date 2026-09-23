document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".gallery img");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");

    const closeButton = document.querySelector(".lightbox-close");
    const nextButton = document.querySelector(".lightbox-next");
    const prevButton = document.querySelector(".lightbox-prev");

    let currentImage = 0;


    // -------------------------
    // SHOW IMAGE
    // -------------------------

    function showImage(index) {

        // Loop around
        if (index >= images.length) {
            index = 0;
        }

        if (index < 0) {
            index = images.length - 1;
        }

        currentImage = index;

        lightboxImage.src = images[currentImage].src;
        lightboxImage.alt = images[currentImage].alt;
    }


    // -------------------------
    // OPEN IMAGE
    // -------------------------

    images.forEach((image, index) => {

        image.addEventListener("click", () => {

            showImage(index);

            lightbox.classList.add("open");

        });

    });


    // -------------------------
    // CLOSE
    // -------------------------

    function closeLightbox() {
        lightbox.classList.remove("open");
    }


    closeButton.addEventListener("click", closeLightbox);


    // -------------------------
    // NEXT / PREVIOUS
    // -------------------------

    nextButton.addEventListener("click", (event) => {

        event.stopPropagation();

        showImage(currentImage + 1);

    });


    prevButton.addEventListener("click", (event) => {

        event.stopPropagation();

        showImage(currentImage - 1);

    });


    // -------------------------
    // CLICK BACKGROUND TO CLOSE
    // -------------------------

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    // -------------------------
    // KEYBOARD
    // -------------------------

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("open")) {
            return;
        }

        if (event.key === "ArrowRight") {
            showImage(currentImage + 1);
        }

        if (event.key === "ArrowLeft") {
            showImage(currentImage - 1);
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

    });


    // -------------------------
    // MOBILE SWIPE
    // -------------------------

    let touchStartX = 0;
    let touchStartY = 0;

    lightbox.addEventListener("touchstart", (event) => {

        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;

    }, { passive: true });


    lightbox.addEventListener("touchend", (event) => {

        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const differenceX = touchEndX - touchStartX;
        const differenceY = touchEndY - touchStartY;


        // Ignore mostly vertical swipes
        if (Math.abs(differenceX) < Math.abs(differenceY)) {
            return;
        }


        // Swipe must be at least 50px
        if (Math.abs(differenceX) < 50) {
            return;
        }


        // Swipe left
        if (differenceX < 0) {
            showImage(currentImage + 1);
        }


        // Swipe right
        if (differenceX > 0) {
            showImage(currentImage - 1);
        }

    }, { passive: true });

});