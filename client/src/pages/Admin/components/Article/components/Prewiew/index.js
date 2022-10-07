import React from 'react';

import styles from './styles.module.scss';

function Prewiew({ article, content }) {
    const contentArticle = content.contents.filter(cont => cont.article.id === article.articles[0].id)

    console.log(article, content);
    // const arr = [
    //     {
    //         text_1: "",
    //         text_2: "",
    //         li_1: "TTTTTTTTTTTTTTTTTTTttttttttttttttttt ",
    //         li_2: "KKKKKKKKKKKKKKKKKKKKKKK",
    //         strong: "ffffffffffffffffffffff ",
    //         imgSrc: "",
    //         imgTitle: "",
    //         aHref: "",
    //         aText: "",
    //     },
    //     {
    //         text_1: " d;d;dldldlktjttjtjjt ",
    //         text_2: " d;d;dldldlktjttjtjjt ",
    //         li_1: "",
    //         li_2: "",
    //         strong: "",
    //         imgSrc: "https://i.obozrevatel.com/gallery/2022/9/25/3084258931663071594009388168966323601392584n.jpg",
    //         imgTitle: "Картинка №1",
    //         aHref: "https://goggle.com/",
    //         aText: "tttttttttttttttttttttt",
    //     },
    //     {
    //         text_1: "",
    //         text_2: "",
    //         li_1: "",
    //         li_2: "adadadadadadadadadd",
    //         strong: "ahhthti7i7i7i7i7i7",
    //         imgSrc: "",
    //         imgTitle: "",
    //         aHref: "",
    //         aText: "",
    //     },
    // ];

    return (
        <div className={styles.container}>
            <h2>{article.articles[0].title}</h2>
            {contentArticle.map((item, index) => (
                <div key={index}>
                    {item.text_1 && item.text_1}
                    {item.imgSrc && (<div className={styles.containerImg}><img src={item.imgSrc} alt="" title={item.imgTitle} /><span>{item.imgTitle}</span></div>)}
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
                </div>
            ))}
        </div>
    );
};

export default Prewiew;