import React from 'react';
//import { useParams } from 'react-router-dom';

import styles from "./styles.module.scss";

function User () {
    //const { id } = useParams();

    //console.log(id);

    return (
        <div className={styles.container}>
            <h1>User</h1>
        </div>
    );
}

export default User;