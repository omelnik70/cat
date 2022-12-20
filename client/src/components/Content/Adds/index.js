import React, { useContext } from 'react';

import Slider from '../../Slider';
import Context from "../../../Context";

import styles from './styles.module.scss';

function Adds() {
  const { state } = useContext(Context);
  const { slider } = state;
  
  const sliderPropsMobile = {
    delayOffset: 500, //скорость скольжения в мс
    delayInterval: 5000, //задержка в мс перед скольжением
    manual: false, //ручное переслистование слайдов (true), автоматическое (false)
    hoverStop: false, //(true) - при наведении мышки на блок, слайдер в авто режиме останавливается, (false) - игнорируется
    slidesInBlock: 1, //количество видимых слайдов в блоке
  };
  
  const sliderPropsDesctop = {
    delayOffset: 500, //скорость скольжения в мс
    delayInterval: 5000, //задержка в мс перед скольжением
    manual: false, //ручное переслистование слайдов (true), автоматическое (false)
    hoverStop: true, //(true) - при наведении мышки на блок, слайдер в авто режиме останавливается, (false) - игнорируется
    slidesInBlock: 1, //количество видимых слайдов в блоке
  };

return (
    <>
        <div className={styles.mobile}>
            <Slider value={sliderPropsMobile}>
            {/* здесь вставляете слыйды любым способом в любом формате*/}
            {slider.map((item, index) => (
                <a className={styles.slide} key={index} href={item.link}><img src={item.slide} alt="slide" /></a>
            ))}
            {/* ========================== */}
            </Slider>
        </div>
        <div className={styles.desctop}>
            <Slider value={sliderPropsDesctop}>
            {/* здесь вставляете слыйды любым способом в любом формате*/}
            {slider.map((item, index) => (
                <a className={styles.slide} key={index} href={item.link}><img src={item.slide} alt="slide" /></a>
            ))}
            {/* ========================== */}
            </Slider>
        </div>
    </>
);
}

export default Adds;