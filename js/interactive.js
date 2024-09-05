document.addEventListener('DOMContentLoaded', function () {

    //GSAP
    gsap.set("#scene1", {duration: 2,autoAlpha: 1});
    gsap.set("#videoScene", { y: "100%" });
    gsap.set("#scene2", {y: "100%"});

    gsap.timeline()
    .to("#scene1", {duration: 2})
    .to("#videoScene", { duration: 1, y: "0", ease: "power2.out" }, "+=0.5") 
    .to("#videoScene .video", { duration: 0, autoAlpha: 0 }, "+=30") 
    .to("#scene2", { duration: 1, y: "0", ease: "power2.out" }, "+=0.5")
    .call(() => {
    const carousel = new Swiper('.swiper-carousel', {
        slidesPerView: 1,
        loop: true,
        autoplay:{
            delay: 2000,
            disableOnInteraction: false,
        }
    });

    setTimeout(() => {
        carousel.autoplay.stop();
    }, 30000)
    })

    //video control
    const video = document.querySelector("#video");
    const videoScene = document.querySelector("#videoScene");

    const playVideo = () => {
        video.play().catch(() => {
            video.controls = true;
        });
    }

    const pauseVideo = () => {
        video.pause();
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playVideo();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(videoScene);

    videoScene.addEventListener('click', (event) => {

        const viewportWidth = window.innerWidth;

        if(viewportWidth >= 658){
            event.stopPropagation();
            event.preventDefault();
    
            pauseVideo();
    
            setTimeout(() => {
                window.open(videoScene.href, "_blank");
            }, 0);
        }

    })


})




