document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".gallery img");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");

    const closeButton = document.querySelector(".lightbox-close");
    const nextButton = document.querySelector(".lightbox-next");
    const prevButton = document.querySelector(".lightbox-prev");

    let currentImage = 0;


    // SHOW IMAGE
    function showImage(index) {

        // Loop from last image back to first
        if (index >= images.length) {
            index = 0;
        }

        // Loop from first image back to last
        if (index < 0) {
            index = images.length - 1;
        }

        currentImage = index;

        lightboxImage.src = images[currentImage].src;
        lightboxImage.alt = images[currentImage].alt;
    }


    // OPEN THUMBNAIL
    images.forEach((image, index) => {

        image.addEventListener("click", () => {

            showImage(index);
            lightbox.classList.add("open");

        });

    });


    // CLOSE
    closeButton.addEventListener("click", () => {
        lightbox.classList.remove("open");
    });


    // NEXT
    nextButton.addEventListener("click", () => {
        showImage(currentImage + 1);
    });


    // PREVIOUS
    prevButton.addEventListener("click", () => {
        showImage(currentImage - 1);
    });


    // CLICK BACKGROUND TO CLOSE
    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            lightbox.classList.remove("open");
        }

    });


    // KEYBOARD CONTROLS
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
            lightbox.classList.remove("open");
        }

    });

});