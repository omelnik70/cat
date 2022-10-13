import React from 'react';
import { useQuery } from '@apollo/client';

import Loading from '../../../Loading';
import { ARTICLE_QUERY } from '../../../../apollo/queries';
import styles from "./styles.module.scss";


function Post ({ id }) {
    const { loading, data } = useQuery(ARTICLE_QUERY, {
        variables: { id: id },
      });
      
      if (loading) return <Loading />;
      const { article } = data;
      const { title, content } = article;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            {content.map((item, index) => (
                <div className={styles.text} key={index}>
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
}

export default Post;