const images = document.querySelectorAll(.gallery img);

const lightbox = document.getElementById(lightbox);
const lightboxImage = document.querySelector(.lightbox-image);

const closeButton = document.querySelector(.lightbox-close);
const prevButton = document.querySelector(.lightbox-prev);
const nextButton = document.querySelector(.lightbox-next);

let currentImage = 0;


function showImage(index) {

    if (index  0) {
        index = images.length - 1;
    }

    if (index = images.length) {
        index = 0;
    }

    currentImage = index;

    lightboxImage.src = images[currentImage].src;
    lightboxImage.alt = images[currentImage].alt;
}


function openLightbox(index) {
    showImage(index);
    lightbox.classList.add(open);
}


function closeLightbox() {
    lightbox.classList.remove(open);
}


images.forEach((image, index) = {
    image.addEventListener(click, () = {
        openLightbox(index);
    });
});


prevButton.addEventListener(click, () = {
    showImage(currentImage - 1);
});


nextButton.addEventListener(click, () = {
    showImage(currentImage + 1);
});


closeButton.addEventListener(click, closeLightbox);


lightbox.addEventListener(click, (event) = {
    if (event.target === lightbox) {
        closeLightbox();
    }
});


document.addEventListener(keydown, (event) = {


    if (!lightbox.classList.contains(open)) {
        return;
    }

    if (event.key === ArrowLeft) {
        showImage(currentImage - 1);
    }

    if (event.key === ArrowRight) {
        showImage(currentImage + 1);
    }

    if (event.key === Escape) {
        closeLightbox();
    }
});