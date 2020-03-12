// Lazy loading images
// Given images rendered as:
// <img data-src="IMAGEURL" />
export const createImagesObserver = () => {
    const images = document.querySelectorAll("[data-src]");
    const options = {
        root: null,
        rootMargin: "0px 0px 100px 0px", // Start loading the image 100px before it starts showing
        threshold: 0 // How much of the target element should be visible to trigger the observer?
    };
    const callback = (entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                // Once we load the image, we want to stop observing it
                self.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);

    images.forEach(image => {
        observer.observe(image);
    });
};

// Shows an element when is visible
// Given a hidden element with class 'elementClassname'
export const createElementObserver = () => {
    const elementContainer = document.getElementsByClassName('elementClassname')[0];
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.9 // How much of the target element should be visible to trigger the observer?
    };
    const callback = (entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove(HIDDEN_CLASSNAME);
                // After showing it, we are removing the observer
                self.disconnect();
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);

    observer.observe(elementContainer);
};
