import React, {FC} from 'react';
import {SidebarItem} from '../../redux/state';
import { StoreContext } from '../../StoreContext';
import S from '../Sidebar/Sidebar.module.css';


export const Sidebar = () => {
    return (
        <StoreContext.Consumer>
            {  // фигурные скобки <StoreContext.Consumer> на новой строке
                (store: any) => {
                    let state = store.getState().sidebar;

                    return <div className={S.block}>
                        <h3>Friends</h3>
                        <div className={S.items}>
                            {
                                state.friends.map((f: any) => {
                                    return (
                                        <div className={S.card} key={f.id}>
                                            <img src={f.src} alt={'friend-avatar'}/>
                                            <p>{f.name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        }
        </StoreContext.Consumer>
    );
};