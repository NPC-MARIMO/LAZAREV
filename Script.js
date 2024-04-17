let scrollTriggerPlusLocomotiveJsCode = ()=>{
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
// locomotive js is used for smooth scrolling but locomotive actually highjacks the scroll thing , so scrollTrigger does not work , the above code let locomotive and scrollTrigger work togather

gsap.registerPlugin(ScrollTrigger);

let navFn = () => {
    let navs = document.querySelectorAll(".elem h4");
    navs.forEach((nav) => {
        nav.addEventListener("mouseenter", () => {
            let tl = gsap.timeline();
            tl.to("#expand", {
                height: "50vh",
            }).to(".elem>h5", {
                display: "block"
            }).to(".elem>h5>span", {
                left: "0",
                stagger: 0.03
            })
        })
    })
    navs.forEach((nav) => {
        nav.addEventListener("mouseleave", () => {
            let tl = gsap.timeline();
            tl.to(".elem>h5>span", {
                left: "-100%",
                stagger: 0.01
            })
                .to("#expand", {
                    height: "21vh",
                    duration: 0.3
                })
        })
    })
    gsap.to("#expand", {
        y: -90,
        scrollTrigger: {
            scroll : "#main",
            trigger: "#page2",
            scrub: 1,
            start: "top bottom"
        }
    })
    gsap.to("nav", {
        y: -50,
        scrollTrigger: {
            scroll : "#main",
            trigger: "#page2",
            scrub: 1,
            start: "top bottom"
        }
    })
}
let page1Btn1Fn = () => {
    let btn1 = document.querySelector("#btn1");
    btn1.addEventListener("mouseenter", () => {
        gsap.to("#buttonBg", {
            width: "6vh",

        })
    })
    btn1.addEventListener("mouseleave", () => {
        gsap.to("#buttonBg", {
            width: "9vw",

        })
    })
}
let page2RelemsFn = () => {
    let relems = document.querySelectorAll(".rightElem");
    relems.forEach((elem) => {
        elem.addEventListener("mouseenter", () => {
            gsap.to(elem.childNodes[3], {
                opacity: 1,
                scale: 1
            })
        })
        elem.addEventListener("mouseleave", () => {
            gsap.to(elem.childNodes[3], {
                opacity: 0,
                scale: 0
            })
        })
        elem.addEventListener("mousemove", (dets) => {
            gsap.to(elem.childNodes[3], {
                x: dets.x - elem.getBoundingClientRect().x - 50,
                y: dets.y - elem.getBoundingClientRect().y - 150
            })
        })
        gsap.from(elem, {
            y: 25,
            opacity: 0,
            scrub: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none reverse reset"
            }
        })
        gsap.from("#p2LH5", {
            x: -45,
            opacity: 0,
            scrub: 1,
            scrollTrigger: {
                trigger: "#p2LH5",
                start: "top 90%",
                toggleActions: "play none reverse reset"
            }
        })
    })
}
let page3VideoFn = () => {
    let page3center = document.querySelector("#page3center");
    let video = document.querySelector("#page3 video");
    page3center.addEventListener("click", () => {
        video.play();
        gsap.to(video, {
            opacity: 1,
            transform: "scaleX(1) scaleY(1)",
            borderRadius: 0
        })
    })
    video.addEventListener("click", () => {
        video.pause();
        gsap.to(video, {
            opacity: 0,
            transform: "scaleX(.7) scaleY(0)",
            borderRadius: "3vw"
        })
    })
}
let page7VideoFn = () => {
    let page7SecRight = document.querySelectorAll(".secRight");
    page7SecRight.forEach((elem) => {
        elem.addEventListener("mouseenter", () => {
            elem.childNodes[3].style.opacity = 1;
            elem.childNodes[3].play();
            gsap.to(elem.childNodes[5], {
                scale: 1,
                opacity: 1,
            })

        })
        elem.addEventListener("mouseleave", () => {
            elem.childNodes[3].style.opacity = 0;
            elem.childNodes[3].load();
            gsap.to(elem.childNodes[5], {
                scale: 0,
                opacity: 0,
            })
        })
        elem.addEventListener("mousemove", (dets) => {
            console.log(elem.childNodes[5]);
            gsap.to(elem.childNodes[5], {
                x: dets.x - elem.getBoundingClientRect().x - 80,
                y: dets.y - elem.getBoundingClientRect().y - 600,
            })
        })
    })

}
let page8VideoFn = () => {
    let page8Divs = document.querySelectorAll(".page8Div");
    page8Divs.forEach((div) => {
        div.addEventListener("mouseenter", () => {
            gsap.to(div, {
                borderTop: "5px solid #000",
            })
            gsap.to(div.childNodes[3], {
                opacity: 0
            })
            div.childNodes[7].play();
            gsap.to(div.childNodes[7], {
                height: "65%",
                opacity: 1,
                scale: 1,
                ease: Expo.easeInOut,
                duration: 1
            })
        })
        div.addEventListener("mouseleave", () => {
            gsap.to(div, {
                borderTop: "3px solid #F5F5F5",
            })
            gsap.to(div.childNodes[3], {
                opacity: 1
            })
            div.childNodes[7].load();
            gsap.to(div.childNodes[7], {
                height: "35%",
                opacity: 1,
                ease: Expo.easeInOut,
                duration: 1
            })
        })
    })
}
let page10Fn = () => {
    let p10Bottoms = document.querySelectorAll(".p10Bottom");
    let p10TF = false;
    p10Bottoms.forEach((div) => {
        div.addEventListener("click", () => {
            if (p10TF == false) {
                gsap.to(div.childNodes[3], {
                    height: "7vw",
                    opacity: 1
                })
                gsap.to(div.childNodes[5], {
                    height: "7vw",
                    opacity: 1
                })
                gsap.to(div.childNodes[7], {
                    height: "7vw",
                    opacity: 1
                })
                gsap.to(div.childNodes[9], {
                    height: "7vw",
                    opacity: 1
                })
                p10TF = true;
            }
            else {
                gsap.to(div.childNodes[3], {
                    height: "0vw",
                    opacity: 0
                })
                gsap.to(div.childNodes[5], {
                    height: "0vw",
                    opacity: 0
                })
                gsap.to(div.childNodes[7], {
                    height: "0vw",
                    opacity: 0
                })
                gsap.to(div.childNodes[9], {
                    height: "0vw",
                    opacity: 0
                })
                p10TF = false
            }
        })
    })
}
let page4Fn = () => {
    gsap.from("#page4L", {
        x: -20,
        opacity: 0,
        scrollTrigger: {
            trigger: "#page4L",
            start: "top 80%",
            toggleActions: "play none reverse reset",
            scrub: true
        }
    })
    gsap.from("#page4R", {
        y: 25,
        opacity: 0,
        scrollTrigger: {
            trigger: "#page4R",
            start: "top 80%",
            toggleActions: "play none none reset",
            scrub: true
        }
    })
}
let page5Fn = () => {
    let boxes = document.querySelectorAll(".page5boxes");
    boxes.forEach((box) => {
        gsap.from(box, {
            scale: 0,
            opacity: 0,
            scrollTrigger: {
                trigger: box,
                start: "top 80%",
                toggleActions: "play none none reset",
                scrub: true
            }
        })
    })

}
let page6Fn = () => {
    gsap.from("#page6Txt", {
        opacity: 0,
        scale: 1.5,
        y: 100,
        scrollTrigger: {
            trigger: "#page6Txt",
            start: "center 90%",
            end: "center 65%",
            toggleActions: "play none none reset",
            scrub: true
        }
    })
}
let page7Fn = () => {
    let p7SLefts = document.querySelectorAll(".secLeft");
    let p7SRights = document.querySelectorAll(".secRight");
    p7SLefts.forEach((left) => {
        gsap.from(left, {
            x: -100,
            opacity: .4,
            scrollTrigger: {
                trigger: left,
                start: "top 85%",
                toggleActions: "play none none reset",
                scrub: true,
                end: "center 65%"
            }
        })

    })
    p7SRights.forEach((right) => {
        gsap.from(right, {
            x: 200,
            opacity: .4,
            scrollTrigger: {
                trigger: right,
                start: "top 85%",
                toggleActions: "play none none reset",
                end: "center 65%",
                scrub: true,
            }
        })

    })
}
let page9Fn = ()=>{
    gsap.to("#page9" , {
        height : "68vh",
        transition :"linear",
        scrollTrigger: {
            trigger : "#page9",
            start : "top 60%",
            toggleActions : "play none none reset",
            scrub : .5,
            end : "top 35%",
        }
    })
}
gsap.from(".page8Div" , {
    opacity : 0 ,
    y : 300,
    stagger : .1,
    scrollTrigger : {
        trigger: ".page8Div",
        start: "top 88%",
        end : "top 50%",
        toggleActions : "play none none reset"
    }
})

navFn();

page1Btn1Fn();

page2RelemsFn();

page3VideoFn();

page7VideoFn();

page8VideoFn();

page10Fn();

page4Fn();

page5Fn();

page6Fn();

page7Fn();

page9Fn();