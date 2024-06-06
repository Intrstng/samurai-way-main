import React from 'react';
import {store} from './redux/redux-store';


export const StoreContext: any = React.createContext(null);


// const Provider = (props) => {
//     return <StoreContext.Provider value={props.store}>
//         {props.children}
//         </StoreContext.Provider>
// }

// Context used in Sidebar component