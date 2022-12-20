import React, { useState, useEffect, Children, cloneElement } from 'react';

import { 
    handleClickOffsetLeft, 
    handleClickOffsetRight, 
    numberSlides 
} from './actions';

import styles from './style.module.scss';

function Slider({ children, value }) {
    //children - слайды
    //delayOffset - плавноть скольжения в миллисекуднах
    //delayInterval - задержка перед скольженим в миллисекуднах
    //slidesInBlock - количество слайдов в видимом блоке
    const [slides, setSlides] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hover, setHover] = useState(false);
    const [comparison, setComparison] = useState();

    const { 
        delayOffset, 
        delayInterval, 
        manual,
        hoverStop,
        slidesInBlock,
    } = value;

    const NUMBER_SLIDES = numberSlides(slidesInBlock);

    //если количество слайдов не кратно количеству видимых слайдов, последний не будет показан
    const sumSlides = Number.isInteger(children.length / slidesInBlock) ? children.length : children.length - 1;

    useEffect(() => {
        setSlides(
            Children.map(children, child => {
                return cloneElement(child, {
                    style: {
                        height: "100%",
                        minWidth: `${NUMBER_SLIDES}%`,
                        maxWidth: `${NUMBER_SLIDES}%`,
                    },
                })
            }))
    }, [children, NUMBER_SLIDES]);

    useEffect(() => {
        if (!manual && !hover) {
            let flagInterval;
            if (Boolean(offset) !== comparison) {
                flagInterval = setInterval(() => handleClickOffsetLeft(setOffset, setComparison, sumSlides, slidesInBlock), `${delayInterval}`);
            } else {
                flagInterval = setInterval(() => handleClickOffsetRight(setOffset, slidesInBlock), `${delayInterval}`);
            };
            return () => clearInterval(flagInterval);
        }
        return;
    });

    return (
        <div 
            onMouseEnter={() => setHover(hoverStop ? true : false)}
            onMouseLeave={() => setHover(false)}
            className={styles.windowBox}
        >
            {((manual || hover) && (offset !== -(((sumSlides/slidesInBlock) - 1) * 100))) && (
                <div 
                    onClick={() => handleClickOffsetLeft(setOffset, setComparison, sumSlides , slidesInBlock)}
                    className={`${styles.arrow} ${styles.left}`}
                >
                        <span></span>
                        <span></span>
                        <span></span>
                </div>
            )}
            <div 
                className={styles.slides}
                style={{
                    transform: `translateX(${offset}%)`,
                    transitionDuration: `${delayOffset}ms`,
                }}
            >
                {slides}
            </div>
            {((manual || hover) && Boolean(offset)) && (
                <div 
                    onClick={() => handleClickOffsetRight(setOffset, slidesInBlock)}
                    className={`${styles.arrow} ${styles.right}`}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )}
        </div>
    );
}

export default Slider;