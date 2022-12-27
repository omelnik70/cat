import React from 'react';

import assets from '../../../assets';

import styles from './styles.module.scss';

function NewUsers ({ texts }) {
    const { IMAGES } = assets;
    const { NEWUSERS_1, NEWUSERS_2, NEWUSERS_3 } = IMAGES;
    const { title, gift, coupon, price } = texts;

    return (
        <a href="https://s.zbanx.com/r/xFhrHj4xgsm8">
            <div className={styles.container}>
                    
                        <h2>
                            {title}
                        </h2>
                        <div className={styles.imagesBox}>
                            <img src={NEWUSERS_1} alt="Подарки" title={gift} />
                            <img src={NEWUSERS_2} alt="Купоны" title={coupon} />
                            <img src={NEWUSERS_3} alt="Эксклюзивная цена" title={price} />
                        </div>
            </div>
        </a>
    );
}

export default NewUsers;