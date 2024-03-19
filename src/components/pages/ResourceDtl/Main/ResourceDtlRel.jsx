import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"
import { convertDate } from "@utils/text.js"


function ResDtlRel(props) {
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [limit, setLimit] = useState(999);
    let perView = 2;
    let newList = props.list.reduce((accumulator, currentValue, currentIndex, array) => {
        if (currentIndex % perView === 0) {
            accumulator.push(array.slice(currentIndex, currentIndex + 2));
        }
        return accumulator;
    }, [])
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        disabled: false,
        slides: {
            spacing: 36,
        },
        defaultAnimation: {
            duration: 800
        },
        breakpoints: {
            '(max-width: 991px)': {
                disabled: true
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })
    useEffect(() => {
        if (window.innerWidth < 992) {
            setLimit(1)
        }
    }, [])
    return (
        <div className="resource-dtl-rel">
            <div className="resource-dtl-rel-head">
                <h3 className="heading h4 txt-black txt-up resource-dtl-rel-head-title">related articles</h3>
                {loaded && instanceRef && props.list.length > perView && (
                    <div className="resource-dtl-rel-head-nav">
                        <button className="resource-dtl-rel-head-nav-item resource-dtl-rel-head-nav-item-prev"
                            onClick={() => { instanceRef.current.prev() }}
                            disabled={instanceRef.current.track.details.rel === 0}>
                            <div className="ic ic-16">
                                {props.icArrow}
                            </div>
                        </button>
                        <button className="resource-dtl-rel-head-nav-item resource-dtl-rel-head-nav-item-next"
                            onClick={() => { instanceRef.current.next() }}
                            disabled={instanceRef.current.track.details.rel === instanceRef.current.track.details.maxIdx}>
                            <div className="ic ic-16">
                                {props.icArrow}
                            </div>
                        </button>
                    </div>
                )}
            </div>
            <div className="resource-dtl-rel-main">
                <div className="line"></div>
                <div className={`keen-slider  resource-dtl-rel-main-inner ${limit >= newList.length ? 'all-loaded' : ''}`} ref={sliderRef} style={{ '--perView': perView }}>
                    {newList.map((chunk, idx) =>
                        idx < limit && (
                            <div className="keen-slider__slide resource-dtl-rel-main-inner-group" key={idx}>
                                {chunk.map((item, itemIdx) => (
                                    <a href={`/resources/${item.uid}`} className="resource-dtl-rel-main-inner-group-item" key={itemIdx} >
                                        <div className="resource-dtl-rel-main-inner-group-item-img">
                                            <img src={item.data.feature_image.url} alt={item.data.feature_image.alt} width={item.data.feature_image.dimensions.width} className='img img-fill' />
                                        </div>
                                        <div className="resource-dtl-rel-main-inner-group-item-content">
                                            <div className="txt txt-20 txt-bold resource-dtl-rel-main-inner-group-item-content-cate">
                                                {item.data.category}
                                            </div>
                                            <h3 className='heading h4 txt-black txt-up resource-dtl-rel-main-inner-group-item-content-title'>
                                                {item.data.title}
                                            </h3>
                                            <p className='txt txt-18 txt-med resource-dtl-rel-main-inner-group-item-content-des'>
                                                {item.data.sapo}
                                            </p>
                                            <span className='txt txt-18 txt-med resource-dtl-rel-main-inner-group-item-content-date'>
                                                {convertDate(item.last_publication_date)}
                                            </span>
                                            <div className="line line-ver"></div>
                                            <div className="line"></div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className={`resource-dtl-rel-load ${limit >= newList.length ? 'hidden' : ''}`}>
                <button className="resource-dtl-rel-load-btn" onClick={() => setLimit(limit + 1)}>
                    <div className="resource-dtl-rel-load-btn-ic">
                        <div className="ic ic-24">
                            {props.icDropdown}
                        </div>
                    </div>
                    <div className="txt txt-16 txt-med resource-dtl-rel-load-btn-txt">
                        Load more
                    </div>
                </button>
            </div>
        </div >
    )
}

export default ResDtlRel