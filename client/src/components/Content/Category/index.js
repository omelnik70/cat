import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Context from '../../../Context';
import { currentArt } from '../../../data/actions';
import { transliter } from '../../Helper/Helper';

import styles from "./styles.module.scss";


function Category ({ data, href }) {
    const { dispatch } = useContext(Context);
    
    return (
        <div className={styles.container}>
            {data.article.map(art => (
                <Link 
                    key={art.id} 
                    to={data.lang.id !== "6311a20e4690f0b08bf74073" ? 
                        `/${href}/${transliter(art.title)}` : 
                        `/${href}/${art.title.toLowerCase().replace(/ /g,"_").replace(/[\s.,%]/g, '')}`}
                >
                    <h3 onClick={() => dispatch(currentArt(art.id))}>{art.title}</h3>
                </Link>
               ))}
        </div>
    );
}

export default Category;