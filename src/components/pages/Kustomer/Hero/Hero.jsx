import "./Hero.scss"
import KustomerHeroThree from "./HeroThree"
import { useState, useEffect, useMemo, useCallback } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import { isEmpty } from "@utils/text";

function KustomerHero(props) {
    const [currentIdx, setCurrentIdx] = useState(props.page_title === 'Medical' ? 0 : 2);
    const productArr = {
        "Retail": [
            {
                url: '/glb/plates-80-transformed.glb',
                scale: [.8, .8, .8],
                position: [0, 0.035, 0]
            },
            {
                url: '/glb/3-elegant-compartments-plates-clean-transformed.glb',
                scale: [1.6, 1.6, 1.6],
                rotation: [Math.PI * -.5, 0, 0],
                position: [0, 0.03, 0]
            },
            {
                url: '/glb/xc-12g-bowl-clean-transformed.glb',
                scale: [1.15, 1.15, 1.15]
            },
            {
                url: '/glb/1-plate-clean-transformed.glb',
                scale: [.8, .8, .8],
                // rotation: [0, Math.PI * -.065, Math.PI * .03],
                position: [0, 0.02, 0]
            },
            {
                url: '/glb/elegant-oval-platter-clean-transformed.glb',
                scale: [.6, .6, .6],
                position: [0, 0.02, 0]
            },
            {
                url: '/glb/Wall-Hot-Cup-Insert-RR5003-clean-transformed.glb',
                scale: [.9, .9, .9]
            }
        ],
        "Foodservice": [
            {
                url: '/glb/13-burger-box-clean-transformed.glb',
                scale: [1.1, 1.1, 1.1],
            },
            {
                url: '/glb/64-oval-bowl-clean-transformed.glb',
                scale: [.85, .85, .85],
                position: [0, 0.025, 0]
            },
            {
                url: '/glb/42-ramen-grip-clean-transformed.glb',
                scale: [.75, .75, .75],
                rotation: [0, Math.PI * .25, 0]
            },
            {
                url: '/glb/banking-dish-natural-clean-transformed.glb',
                scale: [.7, .7, .7],
                rotation: [Math.PI * .01, Math.PI * .5, 0],
                position: [0, 0.025, 0]
            },
            {
                url: '/glb/KA10054-clean-transformed.glb',
                scale: [.75, .75, .75],
                position: [0, 0.03, 0]
            },
        ],
        "Food Processing": [
            {
                url: '/glb/48-monte-tray-clean-transformed.glb',
                scale: [.85, .85, .85],
                position: [0, 0.035, 0]
            },
            {
                url: '/glb/PT8412-monte-tray-transformed.glb',
                position: [0, 0.04, 0],
                scale: [.85, .85, .85],
            },
            {
                url: '/glb/53-square-food-clean-transformed.glb'
            },
            {
                url: '/glb/PT9710-clean-transformed.glb',
                scale: [.85, .85, .85],
                position: [0, 0.03, 0]
            },
            {
                url: '/glb/banking-dish-natural-clean-transformed.glb',
                scale: [.65, .65, .65],
                rotation: [Math.PI * .01, Math.PI * .5, 0],
                position: [0, 0.025, 0]
            },
        ],
        "Education": [
            {
                url: '/glb/3-elegant-compartments-plates-clean-transformed.glb',
                scale: [1.6, 1.6, 1.6],
                rotation: [Math.PI * -.5, 0, 0],
                position: [0, 0.03, 0]
            },
            {
                url: '/glb/78-white-clamshells-clean-transformed.glb',
                scale: [.65, .65, .65],
                rotation: [Math.PI * .02, Math.PI * .07, Math.PI * -.025],
                position: [0, 0.03, 0]
            },
            {
                url: '/glb/KA5516-clean-transformed.glb',
                scale: [1.4, 1.4, 1.4],
            },
            {
                url: '/glb/klamshell-79-transformed.glb',
                scale: [.75, .75, .75],
                rotation: [Math.PI * .02, Math.PI * -.05, Math.PI * .015],
                position: [0, 0.03, 0]
            },
            {
                url: '/glb/1-plate-clean-transformed.glb',
                scale: [.8, .8, .8],
                // rotation: [0, Math.PI * -.065, Math.PI * .03],
                position: [0, 0.02, 0]
            },
            {
                url: '/glb/58-bowl-clean-transformed.glb',
                scale: [.35, .35, .35],
                position: [0, 0.02, 0]
            },
        ],
        "Medical": [
            {
                url: '/glb/surgical-tray-clean-transformed.glb',
                scale: [.45, .45, .45],
                position: [0, 0.03, 0]
            },
        ]
    }

    const handleSwipe = (direction) => {
        const newIndex = currentIdx + direction;
        if (newIndex >= 0 && newIndex < productArr[props.page_title]?.length) {
            setCurrentIdx(newIndex);
            setDirection(direction);
        }
    };

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                handleSwipe(deltaX > 0 ? -1 : 1);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }, { once: true });
    };

    // const handleOnDown = (e) => {
    //     setOnDrag(true);
    //     trackRef.current.dataset.mouseDownAt = e.clientX
    // }
    // const handleOnUp = (e) => {
    //     let track = trackRef.current;
    //     track.dataset.mouseDownAt = "0";
    //     track.dataset.prevPercentage = track.dataset.percentage;
    //     setOnDrag(false);
    // }

    // const handleOnMove = (e) => {
    //     let track = trackRef.current;
    //     if (track.dataset.mouseDownAt === "0") return;

    //     const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    //     const maxDelta = window.innerWidth / 2;
    //     const percentage = (mouseDelta / maxDelta) * -100;
    //     const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    //     const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    //     track.dataset.percentage = nextPercentage;

    //     // setCurrentPos(nextPercentage / 100 * 2 || currentIdx);
    //     setCurrentIdx(-nextPercentage / 100 * 2 || currentIdx);
    // }

    // useEffect(() => {
    //     trackRef.current.onmousedown = (e) => handleOnDown(e);
    //     trackRef.current.ontouchstart = (e) => handleOnDown(e.touches[0]);

    //     trackRef.current.onmouseup = (e) => handleOnUp(e);
    //     trackRef.current.ontouchend = (e) => handleOnUp(e.touches[0]);

    //     trackRef.current.onmousemove = (e) => handleOnMove(e);
    //     trackRef.current.ontouchmove = (e) => handleOnMove(e.touches[0]);
    // }, [trackRef, currentIdx]);

    useEffect(() => {
        const title = new SplitType('.kustomer-hero-title', { types: "lines,words", lineClass: 'split-line' })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.04), at: .2 }],
        ]
        let subtitle
        if (!isEmpty(props.label)) {
            subtitle = new SplitType('.kustomer-hero-subtitle', { types: "lines,words", lineClass: 'split-line' })
            animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

            sequence.push(
                [subtitle.words, { transform: 'none', opacity: 1 }, { duration: .6, delay: stagger(.01), at: 0 }],
            )
        }

        inView('.kustomer-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                if (!isEmpty(props.label)) subtitle.revert()
            })
        })
    }, [])

    return (
        <section className="kustomer-hero bg-white">
            <div className="container grid">
                {props.label && (
                    <div className="heading h6 txt-black txt-up kustomer-hero-subtitle">{props.label}</div>
                )}
                <h1 className="heading h0 txt-black txt-up kustomer-hero-title">{props.title}</h1>
            </div>
            <div className="kustomer-hero-slide" onMouseDown={handleMouseDown}>
                <KustomerHeroThree list={productArr[props.page_title]} currentIdx={currentIdx} />
            </div>
        </section>
    )
}

export default KustomerHero