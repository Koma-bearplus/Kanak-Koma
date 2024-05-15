import "./Main.scss"
import ArrowDropdown from "@components/globals/IcArrow/ArrowDropdown.jsx";
import ArrowDown from "@components/globals/IcArrow/ArrowDown.jsx";
import { formatData, isEmpty } from "@utils/text";
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import { useState, useEffect, useRef, useMemo } from "react";
import { getLenis } from '@components/core/lenis';

import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import Kustomers from "./Kustomers";
import Categories from './Categories'
import ProductPopup from "@components/globals/ProductPopup";

function Item({ data, onClick, filter }) {
    const itemRef = useRef();
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        const item = itemRef.current

        if (animationStarted) {
            timeline().cancel();
            item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'));
            item.querySelector('.katalog-main-list-item-img').removeAttribute('style');
            item.querySelector('.katalog-main-list-item-info-name h4').removeAttribute('style');
            item.querySelector('.katalog-main-list-item-img-inner').removeAttribute('style');
        }

        animate(item.querySelector('.line-left'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.line-bot'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(item.querySelector('.line-right'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.line-mid'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(item.querySelector('.line-qr'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.katalog-main-list-item-info-name h4'), { opacity: 0, transform: "translateY(1rem)" }, { duration: 0 })
        animate(item.querySelector('.katalog-main-list-item-info-qr-inner'), { opacity: 0, scale: .9 }, { duration: 0 })
        animate(item.querySelector('.katalog-main-list-item-img'), { opacity: 0, scale: .9 }, { duration: 0 })

        const sequence = [
            [item.querySelector('.line-left'), { scaleY: 1 }, { duration: .6, at: 0 }],
            [item.querySelector('.katalog-main-list-item-img'), { opacity: 1, scale: 1 }, { duration: .6, at: .2 }],
            [item.querySelector('.line-mid'), { scaleX: 1 }, { duration: .4, at: .35 }],
            [item.querySelector('.line-bot'), { scaleX: 1 }, { duration: .45, at: .5 }],
            [item.querySelector('.line-right'), { scaleY: 1 }, { duration: .5, at: .6 }],
            [item.querySelector('.line-qr'), { scaleY: 1 }, { duration: .4, at: .6 }],
            [item.querySelector('.katalog-main-list-item-info-name h4'), { opacity: 1, transform: "translate(0)" }, { duration: .4, at: .5 }],
            [item.querySelector('.katalog-main-list-item-info-qr-inner'), { opacity: 1, scale: 1 }, { duration: .6, at: .45 }],
        ]

        inView(item, () => {
            timeline(sequence).finished.then(() => {
                setAnimationStarted(false);
                setTimeout(() => {
                    item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'));
                    item.querySelector('.katalog-main-list-item-img').removeAttribute('style');
                    item.querySelector('.katalog-main-list-item-info-name h4').removeAttribute('style');
                    item.querySelector('.katalog-main-list-item-info-qr-inner').removeAttribute('style');
                }, 1000)
            })
        })
    }, [filter])
    return (
        <button className="katalog-main-list-item" data-popup="open" onClick={onClick} ref={itemRef}>
            <div className="katalog-main-list-item-img">
                <div className="katalog-main-list-item-img-inner data-thumb">
                    <img src={data.thumbnail.url} alt={data.thumbnail.alt} width={data.thumbnail?.dimensions?.width} className="img" />
                </div>
            </div>
            <div className="katalog-main-list-item-info">
                <div className="line line-mid"></div>
                <div className="katalog-main-list-item-info-name">
                    <h4 className="heading h6 txt-black txt-up">{data.title}</h4>
                </div>
                <div className="katalog-main-list-item-info-qr">
                    <div className="line line-ver line-qr"></div>
                    <div className="katalog-main-list-item-info-qr-inner">
                        <img src={data.qr?.url} alt={data.qr?.alt} width={data.qr.dimensions?.width} />
                    </div>
                </div>
            </div>
            <div className="line line-ver line-left"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-right"></div>
        </button >
    )
}

function KatalogMain({ allItem, ...props }) {
    const [filter, setFilter] = useState({ kustomer: 'All', category: 'All' });
    const [limit, setLimit] = useState(999999);
    const [currentList, setCurrentList] = useState(allItem);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [detailProductData, setDetailProductData] = useState([]);

    useMemo(() => {
        if (filter.kustomer == 'All') setCurrentList(allItem);
        else {
            let listByKustomer = allItem.filter((item) => item.data.tag_grp.some((target) => target.tags.uid == filter.kustomer));
            setCurrentList(listByKustomer);
        }
    }, [filter.kustomer])

    const renderListItem = useMemo(() => {
        let list = filter.category !== 'All' ? currentList.filter((item) => item.category == filter.category) : currentList
        return (
            list.map(({ data }, idx) => (
                idx < limit &&
                <Item
                    key={idx}
                    data={data}
                    filter={filter}
                    onClick={() => {
                        setIsOpenPopup(true);
                        setDetailProductData(data);
                        // getLenis().stop();
                    }}
                />
            ))
        )
    }, [currentList, filter, limit])

    useEffect(() => {
        if (window.innerWidth < 768) {
            setLimit(4)
        }
        animate('.katalog-main-line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.katalog-main-line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.katalog-main-line-left', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate('.katalog-main-line-right', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate('.katalog-main-list-line', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate('.katalog-main-filter-list-pdf', { opacity: 0 }, { duration: 0 })
        animate('.katalog-main-filter-list-toggle-btn', { opacity: 0 }, { duration: 0 })
        animate('.katalog-main-filter .line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.katalog-main-cate-list .katalog-main-cate-item', { transform: "translateX(-2rem)", opacity: 0 }, { duration: 0 })

        const sequence = [
            ['.katalog-main-line-top', { scaleX: 1 }, { duration: .6, at: 0 }],
            ['.katalog-main-line-bot', { scaleX: 1 }, { duration: .8, at: .1 }],
            ['.katalog-main-line-left', { scaleY: 1 }, { duration: .6, at: .1 }],
            ['.katalog-main-line-right', { scaleY: 1 }, { duration: .6, at: .1 }],
            ['.katalog-main-list-line', { scaleY: 1 }, { duration: .6, at: .1 }],
            ['.katalog-main-filter .line-bot', { scaleX: 1 }, { duration: .6, at: .1 }],
            ['.katalog-main-filter-list-toggle-btn', { opacity: 1 }, { duration: .4, at: .6 }],
            ['.katalog-main-cate-list .katalog-main-cate-item', { transform: "none", opacity: 1 }, { duration: .5, delay: stagger(.05), at: .2 }],
        ]

        const splitTitles = []
        document.querySelectorAll('.katalog-main-filter-list-dropdown .katalog-main-filter-item').forEach((item, idx) => {
            const label = new SplitType(item.querySelector('.katalog-main-filter-item-txt'), { types: 'lines, words', lineClass: 'split-line' })
            animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            sequence.push(
                [label.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.02), at: .2 + .04 * idx }],
            )
            splitTitles.push(label)
        })
        if (window.innerWidth > 767) {
            sequence.push(
                ['.katalog-main-filter-list-pdf', { opacity: 1 }, { duration: .6, at: .6 }]
            )
        } else {
            sequence.push(
                ['.katalog-main-filter-list-pdf', { opacity: 1 }, { duration: .6, at: .1 }]
            )
        }

        inView(".katalog-main", () => {
            timeline(sequence).finished.then(() => {
                splitTitles.forEach(item => item.revert())
                document.querySelector('.katalog-main-line-top').removeAttribute('style')
                document.querySelector('.katalog-main-line-bot').removeAttribute('style')
                document.querySelector('.katalog-main-line-left').removeAttribute('style')
                document.querySelector('.katalog-main-line-right').removeAttribute('style')
                document.querySelector('.katalog-main-list-line').removeAttribute('style')
                document.querySelector('.katalog-main-filter-list-pdf').removeAttribute('style')
                document.querySelector('.katalog-main-filter-list-toggle-btn').removeAttribute('style')
                document.querySelector('.katalog-main-filter .line-bot').removeAttribute('style')
                document.querySelectorAll('.katalog-main-cate-list .katalog-main-cate-item').forEach(item => item.removeAttribute('style'))
            })
        })
    }, [])

    useEffect(() => {
        const searchParam = new URLSearchParams(window.location.search);
        if (searchParam.has("category")) {
            setFilter((filter) => ({ ...filter, category: props.cateList.find(item => formatData(item) === searchParam.get("category")) }))
        };
        if (searchParam.has("kustomer")) {
            setFilter((filter) => ({ ...filter, kustomer: props.kustomerList.find(item => item.uid === searchParam.get("kustomer")).uid }))
        }
    }, [])

    return (
        <section className={`katalog-main ${isOpenPopup ? 'active' : ''}`}>
            <div className="container grid">
                <div className="katalog-main-filter">
                    <div className="line line-top katalog-main-line-top"></div>
                    <div className="katalog-main-filter-inner">
                        <div className="katalog-main-filter-list">
                            <Kustomers list={props.kustomerList} filter={filter} setFilter={setFilter} />
                            <div className="katalog-main-filter-list-pdf-wrap">
                                <a href="/contact?src=download" className="btn katalog-main-filter-list-pdf" data-cursor="txtLink" data-cursor-txtlink="child">
                                    <div className="line line-ver line-left"></div>
                                    <div className="txt txt-20 txt-med katalog-main-filter-list-pdf-txt" data-cursor-txtlink-child>Download Catalog</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="line line-bot"></div>
                </div>
                <Categories data={currentList} originCategory={props.cateList} filter={filter} setFilter={setFilter} />
                <div className="katalog-main-list">
                    <div className="katalog-main-list-wrap">
                        <div className="line line-ver katalog-main-list-line"></div>
                        {renderListItem}
                    </div>
                </div>
                <div className="line katalog-main-line-bot"></div>
                <div className="line line-ver katalog-main-line-left"></div>
                <div className="line line-ver katalog-main-line-right"></div>
            </div>
            <div className="container">
                <div className={`katalog-main-load ${limit >= currentList.length ? 'hidden' : ''}`}>
                    <button className="katalog-main-load-btn" onClick={() => setLimit(limit + 4)}>
                        <div className="katalog-main-load-btn-ic">
                            <div className="ic ic-16">
                                <ArrowDown />
                            </div>
                        </div>
                        <div className="txt txt-16 txt-med katalog-main-load-btn-txt">
                            Load more
                        </div>
                    </button>
                </div>
            </div>
            <ProductPopup
                isActive={isOpenPopup}
                setIsActive={setIsOpenPopup}
                data={detailProductData}
            />
        </section>
    )
}

export default KatalogMain
