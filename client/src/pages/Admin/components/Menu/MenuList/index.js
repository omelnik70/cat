import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Context from '../../../../../Context';
import MenuItem from '../MenuItem';
import AddMenu from '../AddMenu';
import { UPDATE_MENU_MUTATION, REMOVE_MENU_MUTATION } from '../../../../../apollo/mutations';
import { MENUS_QUERY } from '../../../../../apollo/queries';

import styles from './styles.module.scss';

function MenuList({ setActive }) {
    const { state } = useContext(Context);
    const { lang } = state;
    const { loading, error, data } = useQuery(MENUS_QUERY);
    const [updateMenu, { error: updateError }] = useMutation(UPDATE_MENU_MUTATION);
    const [removeMenu, { error: removeError }] = useMutation(REMOVE_MENU_MUTATION, {
        update(cache, { data: { deleteMenu } }) {
            cache.modify({
                fields: {
                    menus(currentMenus = []) {
                        return currentMenus.filter(menu => menu.__ref !== `Menu:${deleteMenu.id}`)
                    },
                },
            });
        },
    });

    if (loading) return 'Loading...';
    if (error || updateError || removeError) return `Error! ${error.message}`;

    return (
        <div className={styles.container}>
            <div
                onClick={() => setActive({ menu: false })}
                className={styles.close}>
                &times;
            </div>
            <AddMenu />
            {data.menus.filter(men => men.lang.id === lang)
            .map(menu => (
                <MenuItem 
                    key={menu.id}
                    onUpdate={updateMenu}
                    onRemove={removeMenu}
                    {...menu}
                />
            ))}
        </div>
    );
};

export default MenuList;