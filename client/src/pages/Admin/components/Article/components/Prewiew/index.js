import React from 'react';

import styles from './styles.module.scss';

function Prewiew() {
    const arr = [
        {
            text_1: "",
            text_2: "",
            li_1: "TTTTTTTTTTTTTTTTTTTttttttttttttttttt ",
            li_2: "KKKKKKKKKKKKKKKKKKKKKKK",
            strong: "ffffffffffffffffffffff ",
            imgSrc: "",
            imgAlt: "",
            imgTitle: "",
            imgText: "",
            aHref: "",
            aText: "",
        },
        {
            text_1: " d;d;dldldlktjttjtjjt ",
            text_2: " d;d;dldldlktjttjtjjt ",
            li_1: "",
            li_2: "",
            strong: "",
            imgSrc: "https://i.obozrevatel.com/gallery/2022/9/25/3084258931663071594009388168966323601392584n.jpg",
            imgAlt: "",
            imgTitle: "",
            imgText: "",
            aHref: "https://goggle.com/",
            aText: "tttttttttttttttttttttt",
        },
        {
            text_1: "",
            text_2: "",
            li_1: "",
            li_2: "adadadadadadadadadd",
            strong: "ahhthti7i7i7i7i7i7",
            imgSrc: "",
            imgAlt: "",
            imgTitle: "",
            imgText: "",
            aHref: "",
            aText: "",
        },
    ];

    return (
        <div className={styles.container}>
            <h2>Как я могу отменить заказ?</h2>
            {arr.map((item, index) => (
                <p key={index}>
                    {item.text_1 && item.text_1}
                    {item.imgSrc && (<img src={item.imgSrc} alt={item.imgAlt} title={item.imgTitle} />)}
                    {(item.strong && !(item.li_1 || item.li_2)) && (<strong>{item.strong}</strong>)}
                    {(item.aHref && !(item.li_1 || item.li_2)) && (<a href={item.aHref}>{item.aText}</a>)}
                    {item.text_2 && item.text_2}
                    {(item.li_1 || item.li_2) && (
                        <ul>
                            <li>{item.li_1 && item.li_1}
                                {item.strong && (<strong>{item.strong}</strong>)}
                                {item.aHref && (<a href={item.aHref}>{item.aText}</a>)}
                                {item.li_2 && item.li_2}
                            </li>
                        </ul>
                    )}
                </p>
            ))}
        </div>
    );
};

export default Prewiew;