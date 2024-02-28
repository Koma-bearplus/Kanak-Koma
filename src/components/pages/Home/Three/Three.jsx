import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import useWindowSize from "@hooks/useWindowSize";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import {Model} from './EDU.jsx';
import {ModelFork} from './PC6200.jsx';
import './Three.scss';
import * as ut from '../../../../js/utils.js';

function Content({...props}) {
    const wrap = useRef()
    const model = useRef()
    const forkWrap = useRef()
    const fork = useRef()
    const [scale, setScale] = useState([ut.parseRem(3200),ut.parseRem(3200),ut.parseRem(3200)]);
    const [pos, setPos] = useState([props.width * .2, -props.height *.15, 0]);
    const [rot, setRot] = useState([Math.PI * .25, - Math.PI *.33, Math.PI * .175]);
    const clock = useThree(state => state.clock)
    useFrame((state, delta) => {
        if (!model.current) return;
        const t = clock.elapsedTime
        model.current.rotation.x = Math.cos(t / 2) * Math.PI * .02
        model.current.rotation.y = Math.sin(t / 2) * Math.PI * .04
        model.current.position.y = Math.sin(t / 2) * .02
        fork.current.rotation.x = Math.cos(t / 2) * Math.PI * .02 * -1
        fork.current.rotation.y = Math.sin(t / 2) * Math.PI * .04 * -1
    })
    useGSAP(() => {
        console.log(wrap)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-hero',
                start: 'top top',
                endTrigger: '.home-abt',
                end: 'bottom bottom',
                scrub: true
            },
            defaults: {
                ease: 'linear'
            }
        })
        tl.to(wrap.current.rotation, {x: Math.PI * .15, y: Math.PI *.1, z: Math.PI * .05})
        .to(wrap.current.position, {x: 0, y: 0}, 0)
        .to(wrap.current.scale, {x: 2000, y: 2000, z: 2000}, 0)
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-abt',
                start: 'bottom bottom',
                endTrigger: '.home-prod-main',
                end: `top-=${window.getComputedStyle(document.querySelector('.home-prod-cards-inner')).top} top`,
                // end: 'bottom bottom',
                scrub: true
            },
            defaults: {
                ease: 'linear'
            }
        })
        tl2
        .to(wrap.current.rotation, {x: Math.PI * .15, y: Math.PI * .5, z: Math.PI * 0})
        .to(wrap.current.position, {x: props.width * .25}, 0)
        .to(wrap.current.scale, {x: 2000, y: 2000, z: 2000}, 0)
    }, [])
    useEffect(() => {
        // setScale(ut.parseRem(2700),ut.parseRem(2700),ut.parseRem(2700))
        // setPos([props.width * .25, -props.height *.2, 0]);
        // setRot([Math.PI * .25, - Math.PI *.33, Math.PI * .175])
        // fork.current.children[0].rotation.y = Math.PI
        // fork.current.children[0].rotation.x = Math.PI * .25 * -1
    }, [props.width, props.height])

    return (
        <>
            <group ref={wrap} scale={scale} position={pos} rotation={rot}>
                {/* <mesh ref={cube} scale={size} position={pos}>
                    <boxGeometry args={[1,1,1]}/>
                    <meshStandardMaterial color="#00ff00"/>
                </mesh> */}
                <mesh ref={model}>
                    <Model />
                </mesh>
            </group>
            <group ref={forkWrap} scale={scale} position={[props.width * .25, props.height * .15, 0]} rotation={[Math.PI * .35, -1 * Math.PI * .25, 0]}>
                <mesh ref={fork}>
                    <ModelFork />
                </mesh>
            </group>
            <ambientLight intensity={4} />

            {/* <OrbitControls /> */}
        </>
    )
}

function HomeThree() {
    const { width, height } = useWindowSize();
    let perspective = height;
    let fov = (Math.atan(height / 2 / perspective) * 2) * 180 / Math.PI;
    return (
        <div className="home-three">
            <div className="home-three-stick">
                <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }}>
                    <Content width={width} height={height}/>
                </Canvas>
                <div className="cube"></div>
            </div>
        </div>
    )
}
export default HomeThree;