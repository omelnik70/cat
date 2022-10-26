import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Context from '../../../../../Context';
import TextSiteItem from '../TextSiteItem';
import AddTextSite from '../AddTextSite';
import { UPDATE_TEXTSITE_MUTATION, REMOVE_TEXTSITE_MUTATION } from '../../../../../apollo/mutations';
import { TEXTSITES_QUERY } from '../../../../../apollo/queries';

import styles from './styles.module.scss';

function TextSiteList({ setActive }) {
    const { state } = useContext(Context);
    const { lang } = state;
    const { loading ,error, data } = useQuery(TEXTSITES_QUERY);
    const [updateTextSite, { error: updateError }] = useMutation(UPDATE_TEXTSITE_MUTATION);
    const [removeTextSite, { error: removeError }] = useMutation(REMOVE_TEXTSITE_MUTATION, {
        update(cache, { data: { deleteTextSite } }) {
            cache.modify({
                fields: {
                    textsites(currentTextSites = []) {
                        return currentTextSites.filter(textsite => textsite.__ref !== `TextSite:${deleteTextSite.id}`)
                    },
                },
            });
        },
    });
 
    if (loading) return <h2>loading...</h2>
    if (error || updateError || removeError) return `Error! ${error.message}`;

    return (
        <div className={styles.container}>
            <div
                onClick={() => setActive({ menu: false })}
                className={styles.close}>
                &times;
            </div>
            <AddTextSite />
            {data.textsites.filter(textSite => textSite.lang.id === lang)
            .map(textsite => (
                <TextSiteItem 
                    key={textsite.id}
                    onUpdate={updateTextSite}
                    onRemove={removeTextSite}
                    {...textsite}
                />
            ))}
        </div>
    );
};

export default TextSiteList;