import { memo, useRef, useEffect, useState, useMemo } from "react";
import cn from 'clsx';
import * as ut from '@/js/utils.js';
import "./styles.scss"
import { getLenis } from '@components/core/lenis';
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import { isEmpty } from "@utils/text";

function ProductPopup({ data, isActive, setIsActive }) {
    const ref = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const isValidData = data.carousel_imgs?.reduce((arr, curr) => arr.concat(!isEmpty(curr.image) && curr.image), [])[0]

    const closePopup = () => {
        getLenis().start()
        setIsActive(false);
        setTimeout(() => setCurrentIndex(0), 200)
    }

    useOutsideAlerter(ref, () => closePopup());

    const handleSwipe = (direction) => {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < data.carousel_imgs?.length) {
            setCurrentIndex(newIndex);
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

    const renderDots = useMemo(() => {
        let totalPages = data.carousel_imgs?.length;
        const dots = [];

        for (let i = 0; i <= totalPages - 1; i++) {
            if (i <= currentIndex + 3 && i >= currentIndex - 3) {
                let dotClass = '';
                if (i === currentIndex) {
                    dotClass = 'active';
                } else if (i == currentIndex - 2 || i == currentIndex + 2) {
                    dotClass = 'medium';
                } else if (i == currentIndex - 3 || i == currentIndex + 3) {
                    dotClass = 'small';
                }
                else {
                    dotClass = '';
                }

                dots.push(
                    <button
                    key={`pagin-${i}`}
                    className={cn("popup-itemdtl-card-pagi-btn", dotClass)}
                    onClick={() => setCurrentIndex(i)}
                />
            );
            } else if ((i === currentIndex + 4 && currentIndex < totalPages - 4) || (i === currentIndex - 4 && currentIndex > 5)) {
                // dots.push(<span key="ellipsis">...</span>);
            }
        }
        return dots;
    }, [currentIndex, data])


    useEffect(() => {
        if (!isValidData) {
            getLenis().start();
            setIsActive(false);
            setCurrentIndex(0);
        }
    }, [isActive, isValidData]);

    return (
        isValidData ? <>
            <div className={cn('popup', { "active": isActive })}>
                <div className="container">
                    <div className="popup-itemdtl" ref={ref}>
                        <button className="popup-itemdtl-btn" onClick={closePopup}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 40 40" fill="none" className="ic ic-40">
                                <path d="M5 35L35 5" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                                <path d="M5 5L35 35" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                            </svg>
                        </button>
                        <div className="popup-itemdtl-wrap">
                            <div className="popup-itemdtl-wrap-inner" data-lenis-prevent="true">
                                <div className="heading h3 txt-black txt-up popup-itemdtl-title">{data.title}</div>
                                <div className="popup-itemdtl-card">
                                    <div className="popup-itemdtl-card-img"
                                        onMouseDown={handleMouseDown}
                                    >
                                        {data.carousel_imgs?.map(({ image }, idx) => (
                                            !isEmpty(image) && (
                                                <div key={idx} className={cn("popup-itemdtl-card-img-inner", { "active": idx === currentIndex })}>
                                                    <img className="img" src={image.url} alt={image.alt} width={image.dimensions.width} />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                    {data.carousel_imgs
                                        ?.reduce((arr, curr) => arr.concat(curr.image), []).length > 1 && (
                                            <div className="popup-itemdtl-card-bottom">
                                                <div className="popup-itemdtl-card-pagi">
                                                    {renderDots}
                                                </div>
                                                <div className="popup-itemdtl-card-nav">
                                                    <button className={cn("popup-itemdtl-card-nav-btn prev", { "disable": currentIndex === 0 })} onClick={() => setCurrentIndex(currentIndex - 1)}>
                                                        <div className="ic ic-24">
                                                            <svg width="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.00002 19.9706H36.9411" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                                                                <path d="M23.7412 6.77075L36.9412 19.9707L23.7425 33.1694" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square" />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                    <button className={cn("popup-itemdtl-card-nav-btn next", { "disable": currentIndex === data.carousel_imgs?.length - 1 })} onClick={() => setCurrentIndex(currentIndex + 1)}>
                                                        <div className="ic ic-24">
                                                            <svg width="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.00002 19.9706H36.9411" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                                                                <path d="M23.7412 6.77075L36.9412 19.9707L23.7425 33.1694" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square" />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                </div>
                                <div className="popup-itemdtl-content">
                                    <h3 className="heading h3 txt-black txt-up popup-itemdtl-content-title">{data.title}</h3>
                                    <div className="popup-itemdtl-table">
                                        <div className="txt txt-14 txt-med popup-itemdtl-table-head">
                                            <div className="popup-itemdtl-table-code">SKU</div>
                                            <div className="popup-itemdtl-table-size">Size</div>
                                            <div className="popup-itemdtl-table-color">Color</div>
                                            <div className="popup-itemdtl-table-count">Pack / Count</div>
                                            <div className="popup-itemdtl-table-dtl">Details</div>
                                            <div className="popup-itemdtl-table-model">3D Model</div>
                                        </div>
                                        <div className="popup-itemdtl-table-item-wrap" data-lenis-prevent>
                                            <div className="popup-itemdtl-table-item-inner">
                                                {data.variants?.map((item, idx) => (
                                                    <button className="txt txt-16 txt-med popup-itemdtl-table-item" key={idx} onClick={() => {setCurrentIndex(idx)}}>
                                                        <div className="popup-itemdtl-table-item-div desktop">
                                                            <div className="popup-itemdtl-table-code">{item.sku ? item.sku : '-'}</div>
                                                            <div className="popup-itemdtl-table-size">{item.size ? item.size : '-'}</div>
                                                            <div className="popup-itemdtl-table-color">{item.color ? item.color : '-'}</div>
                                                            <div className="popup-itemdtl-table-count">{item.pack_count ? item.pack_count : '-'}</div>
                                                            <div className="popup-itemdtl-table-dtl">{item.details ? item.details : '-'}</div>
                                                            <div className="popup-itemdtl-table-model">
                                                                {!isEmpty(item.qr_code) ? (
                                                                    <div className="popup-itemdtl-table-model-inner">
                                                                        <img src={item.qr_code.url} alt={item.qr_code.alt} width={item.qr_code.dimensions.width} />
                                                                    </div>) : '-'
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="popup-itemdtl-table-item-div tablet">
                                                            <div className="line line-ver line-mid"></div>
                                                            <div className="div-left">
                                                                <div className="wrap popup-itemdtl-table-code">
                                                                    <div className="head">SKU</div>
                                                                    {item.sku ? item.sku : '-'}
                                                                </div>
                                                                <div className="wrap popup-itemdtl-table-model">
                                                                    <div className="head">3D Model</div>
                                                                    <div className="popup-itemdtl-table-model-inner">
                                                                        {!isEmpty(item.qr_code) ? (
                                                                            <img src={item.qr_code.url} alt={item.qr_code.alt} width={item.qr_code.dimensions.width} />)
                                                                            : '-'
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="div-right">
                                                                <div className="wrap popup-itemdtl-table-size">
                                                                    <div className="head">Size</div>
                                                                    <div className="body">{item.size ? item.size : '-'}</div>
                                                                </div>
                                                                <div className="wrap popup-itemdtl-table-color">
                                                                    <div className="head">Color</div>
                                                                    <div className="body">{item.color ? item.color : '-'}</div>
                                                                </div>
                                                                <div className="wrap popup-itemdtl-table-count">
                                                                    <div className="head">Pack / Count</div>
                                                                    <div className="body">{item.pack_count ? item.pack_count : '-'}</div>
                                                                </div>
                                                                <div className="wrap popup-itemdtl-table-dtl">
                                                                    <div className="head">Details</div>
                                                                    <div className="body">{item.details ? item.details : '-'}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> : <></>
    )
}
export default memo(ProductPopup);