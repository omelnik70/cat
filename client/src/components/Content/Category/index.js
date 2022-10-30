import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Context from '../../../Context';
import Separator from '../../Separator';
import { currentArt } from '../../../data/actions';

import styles from "./styles.module.scss";


function Category ({ data, href }) {
    const { dispatch } = useContext(Context);
    const { name } = data;

    console.log(data, href);
    
    return (
        <div className={styles.container}>
            <h2>{name}</h2>
            <Separator />
            {data.article.map(art => (
                <Link 
                    key={art.id} 
                    to={`/${href}/${art.link}`}
                >
                    <h3 onClick={() => dispatch(currentArt(art.id))}>{art.title}</h3>
                </Link>
               ))}
        </div>
    );
}

export default Category;