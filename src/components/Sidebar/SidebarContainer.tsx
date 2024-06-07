import { AppDispatch, DialogsItem, MessageItem, SidebarItem } from '../../redux/state';
import { AppRootStateType } from '../../redux/redux-store';
import { sendMessageAC, updateNewMessageBodyAC } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { Dialogs } from '../Dialogs/Dialogs';
import { Sidebar } from './Sidebar';

export type SidebarPropsType = SidebarMapStateToPropsType & DialogsMapDispatchToPropsType

type SidebarMapStateToPropsType = {
  friends: SidebarItem[]
}

let mapStateToProps = (state: AppRootStateType): SidebarMapStateToPropsType => {
  return {
    friends: state.sidebar.friends
  }
}

type DialogsMapDispatchToPropsType = {
}

// let mapDispatchToProps = (dispatch: AppDispatch): DialogsMapDispatchToPropsType => {
//   return {
//   }
// }

export const SidebarContainer = connect<SidebarMapStateToPropsType,DialogsMapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {})(Sidebar) // mapDispatchToProps is empty (because there is no callbacks in props