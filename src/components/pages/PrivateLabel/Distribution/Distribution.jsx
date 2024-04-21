import './Distribution.scss'
import ArrowUpRight from '@/components/globals/IcArrow/ArrowUpRight';
import { useEffect } from 'react';
import SplitType from 'split-type';
import { stagger, inView, animate, timeline } from "motion";

function PrivateDistribute(props) {
    useEffect(() => {
        const title = new SplitType('.private-distribute-title', { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType('.private-distribute-sub', { types: 'lines, words', lineClass: "split-line" });
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(subTitle.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
        animate('.private-distribute-btn-wrap', { opacity: 0, transform: "translateY(10px)" }, { duration: 0 })

        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.05) }],
            [subTitle.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.02), at: '<' }],
            ['.private-distribute-btn-wrap', { opacity: 1, transform: "none" }, { duration: .8, at: '-.5' }]
        ]
        inView('.private-distribute', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subTitle.revert();
                document.querySelector('.private-distribute-btn-wrap').removeAttribute('style');
            })
        }, { margin: "-30% 0px -30% 0px" });

        const cultures = document.querySelectorAll('.private-distribute-main-item');
        cultures.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.private-distribute-main-item-title-txt'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.private-distribute-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelector('.line-top'), { scaleX: 0 }, { duration: 0 })
            animate(el.querySelector('.private-distribute-main-item-title-dot'), { scale: 0 }, { duration: 0 })
            animate(itemTitle.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(itemSub.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
            animate(el.querySelector('.private-distribute-main-item-img img'), { scale: 1.2, opacity: 0 }, { duration: 0 })
            el.querySelector('.line-bot') && animate(el.querySelector('.line-bot'), { scaleX: 0 }, { duration: 0 })

            const sequenceItem = [
                [el.querySelector('.line-top'), { scaleX: 1 }, { duration: 1 }],
                [el.querySelector('.private-distribute-main-item-title-dot'), { scale: 1 }, { duration: .6, at: .1 }],
                [itemTitle.words, { opacity: 1, transform: 'translateY(0%)' }, { duration: .6, delay: stagger(.05), at: .2 }],
                [itemSub.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.005), at: .2 }],
                [el.querySelector('.private-distribute-main-item-img img'), { scale: 1, opacity: 1 }, { duration: 1.2, easing: 'ease-out', at: .3 }],
                [el.querySelector('.line-bot') && el.querySelector('.line-bot') && el.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: .35 }]
            ]

            inView(el, () => {
                timeline(sequenceItem).finished.then(() => {
                    itemTitle.revert()
                    itemSub.revert()
                    el.querySelector('.line-top').removeAttribute('style')
                    el.querySelector('.private-distribute-main-item-title-dot').removeAttribute('style');
                    el.querySelector('.private-distribute-main-item-img img').removeAttribute('style');
                    idx == cultures.length - 1 && el.querySelector('.line-bot').removeAttribute('style')
                })
            }, { margin: "-20% 0px -20% 0px" });
        })
    }, []);
    return (
        <section className="private-distribute bg-light">
            <div className="line line-top"></div>
            <div className="container grid">
                <h2 className="heading h0 txt-up txt-black private-distribute-title">
                    Never Miss a Beat with <span className='txt-green'>Dependable Distribution</span>
                </h2>
                <div className="private-distribute-sub-wrap">
                    <p className="txt txt-18 txt-med private-distribute-sub">
                        We guarantee your shelves stay stocked with top-notch products, rain or shine. Dealing with supply chain hiccups? We got you covered.
                    </p>
                    <div className="private-distribute-btn-wrap">
                        <a href="#" className="txt-link private-distribute-btn" data-cursor="txtLink">
                            <div className="txt txt-18 txt-bold">Learn more</div>
                            <div className="ic ic-16"><ArrowUpRight /></div>
                        </a>
                    </div>
                </div>
                <div className="private-distribute-main">
                    {[...Array(3)].map((item, idx) => (
                        <div className="private-distribute-main-item bg-light" key={idx} style={
                            {
                                '--idx': idx + 1,
                                '--pd-bot': 3 - idx - 1,
                                '--mg-top': idx == 0 ? 0 : 3 - idx
                            }
                        }>
                            <div className="private-distribute-main-item-inner">
                                <div className="line line-top"></div>
                                <div className="private-distribute-main-item-content">
                                    <div className="private-distribute-main-item-title">
                                        <div className="private-distribute-main-item-title-dot"></div>
                                        <h3 className="heading h1 txt-up txt-black private-distribute-main-item-title-txt">
                                            {/* {item.title} */}
                                            Global Standards, Local Love
                                        </h3>
                                    </div>
                                    <p className="txt txt-20 txt-med private-distribute-main-item-sub">
                                        {/* {item.sub} */}
                                        We scrutinize every inch of our products with 100% inspection. Only the cream of the crop makes it through our doors.
                                    </p>
                                </div>
                                <div className="private-distribute-main-item-img">
                                    {/* <img src={item.image.url} alt={item.image.alt} width={item.image.dimensions.width} height={item.image.dimensions.height} className='img img-h' /> */}
                                    {props.img}
                                </div>
                                {idx == 2 && (<div className="line line-bot"></div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default PrivateDistribute