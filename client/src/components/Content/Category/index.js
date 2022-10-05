import React from 'react';
//import { Link } from 'react-router-dom';

import styles from "./styles.module.scss";


function Category () {

    return (
        <div className={styles.container}>
            <h1>Category</h1>
            {/* {
               categories.map(category => (
                <Link key={category.id} to={`/${category.id}/${category.id}`}>
                    <li>{category.title}</li>
                </Link>
               )) 
            } */}
        </div>
    );
}

export default Category;