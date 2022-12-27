import React from 'react';

import assets from '../../../assets';

import styles from './styles.module.scss';

function NewUsers () {
    const { IMAGES } = assets;
    const { NEWUSERS_1, NEWUSERS_2, NEWUSERS_3 } = IMAGES;

    return (
        <a href="https://s.zbanx.com/r/xFhrHj4xgsm8">
            <div className={styles.container}>
                    
                        <h2>
                            AliExpress для новых пользователей
                        </h2>
                        <div className={styles.imagesBox}>
                            <img src={NEWUSERS_1} alt="Подарки" title='Подарки' />
                            <img src={NEWUSERS_2} alt="Купоны" title='Купоны' />
                            <img src={NEWUSERS_3} alt="Эксклюзивная цена" title='Эксклюзивная цена' />
                        </div>
            </div>
        </a>
    );
}

export default NewUsers;