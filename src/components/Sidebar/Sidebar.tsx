import React, { FC } from 'react';
import { SidebarItem } from '../../redux/state';
import S from '../Sidebar/Sidebar.module.css';
import { SidebarPropsType } from './SidebarContainer';

// type SidebarProps = {
//     friends: SidebarItem[]
// }

export const Sidebar: FC<SidebarPropsType> = ({friends}) => {
    return (
        <div className={S.block}>
            <h3>Friends</h3>
            <div className={S.items}>
                {
                    friends.map((f: any) => {
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
    );
};

// // USING CONTEXT API:
// export const Sidebar = () => {
//     return (
//       <StoreContext.Consumer>
//           {  // фигурные скобки <StoreContext.Consumer> на новой строке - используется в Context API
//               (store: any) => {
//                   let state = store.getState().sidebar; // store.getState() - таким образом возмется стор из контекста
//
//                   return <div className={S.block}>
//                       <h3>Friends</h3>
//                       <div className={S.items}>
//                           {
//                               state.friends.map((f: any) => {
//                                   return (
//                                     <div className={S.card} key={f.id}>
//                                         <img src={f.src} alt={'friend-avatar'}/>
//                                         <p>{f.name}</p>
//                                     </div>
//                                   )
//                               })
//                           }
//                       </div>
//                   </div>
//               }
//           }
//       </StoreContext.Consumer>
//     );
// };