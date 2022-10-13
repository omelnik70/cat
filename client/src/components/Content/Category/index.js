import React from 'react';
import { useParams, Link } from 'react-router-dom';

import Post from './Post';
import { transliter } from '../../Helper/Helper';

import styles from "./styles.module.scss";


function Category ({ data, href }) {
    const { linkPost } = useParams();
    console.log(data);
    
    return (
        <div className={styles.container}>
            
            {linkPost ? (<Post />) :
            (data.article.map(category => (
                <Link 
                    key={category.id} 
                    to={data.lang.id !== "6311a20e4690f0b08bf74073" ? 
                        `/${href}/${transliter(category.title)}` : 
                        `/${href}/${category.title.toLowerCase().replace(/ /g,"_").replace(/[\s.,%]/g, '')}`}
                >
                    {category.title}
                </Link>
               )))}
        </div>
    );
}

export default Category;