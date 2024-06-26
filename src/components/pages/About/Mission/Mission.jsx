import './Mission.scss';
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView, scroll } from "motion";
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';

function AboutMission({ ...props }) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const label = new SplitType('.abt-miss-label', { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(q('.abt-miss-title'), { types: 'lines, words', lineClass: 'split-line' })

        animate(q('.line'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate([...label.words, ...title.words], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate('.abt-miss-quote-ic', { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })

        const sequence = [
            [q('.line'), { scaleX: 1 }, { duration: .8, at: 0 }],
            [label.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.1), at: 0 }],
            ['.abt-miss-quote-ic', { opacity: 1, transform: 'none' }, { duration: .8, at: .1 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04), at: .14 }],
        ]
        inView('.abt-miss-title', () => {
            timeline(sequence).finished.then(() => {
                label.revert()
                title.revert()
                q('.line').removeAttribute('style')
                q('.abt-miss-quote-ic').removeAttribute('style')

            })
        }, { margin: "-20% 0px -20% 0px" });
    }, [])
    return (
        <section className="abt-miss bg-dark" ref={sectionRef}>
            <div className="container grid">
                <div className="line"></div>
                <div className="heading h4 txt-black txt-up abt-miss-label">{props.label}</div>
                <div className="abt-miss-title-wrap">
                    <div className="heading h0 txt-black txt-up abt-miss-quote-ic">“</div>
                    <h2 className="heading h1 txt-black txt-up abt-miss-title">{props.quote}</h2>
                </div>
            </div>
        </section>
    );
}

export default AboutMission;