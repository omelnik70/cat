import React, { useContext } from 'react';

import { ReactComponent as Nophoto } from '../../../../../../assets/icons/nophoto.svg';
import { ReactComponent as Like } from '../../../../../../assets/icons/dislike.svg';
import { ReactComponent as DisLike } from '../../../../../../assets/icons/like.svg';
import Context from "../../../../../../Context";
import styles from "./styles.module.scss";

function Comment ({ isUser }) {
    const { state } = useContext(Context);
    const { avatar } = state;

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                {avatar ? (<img src={avatar} alt="avatar" />) : <Nophoto />}
            </div>
            <div className={styles.info}>
                <div className={styles.user}>
                    <div className={styles.login}>
                        <h4>Логин: </h4>
                        <p>@_hhhhhhhhhhh</p>
                    </div>
                    <div className={styles.date}>
                        <h4>Дата: </h4>
                        <p>27.11.2022</p>
                    </div>
                    <div className={styles.time}>
                        <h4>Время: </h4>
                        <p>16.26</p>
                    </div>
                </div>
                <div className={styles.text}>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure fuga architecto voluptates harum eos repudiandae tempore molestias voluptas atque voluptate voluptatibus pariatur laudantium ducimus, nobis id quidem perspiciatis sunt asperiores.</p>
                </div>
                <div className={styles.rate}>
                    <div className={styles.like}>
                        <Like className={styles.likeImg} />
                        <p>15</p>
                    </div>
                    <div className={styles.disLike}>
                        <DisLike className={styles.likeImg} />
                        <p>15</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;