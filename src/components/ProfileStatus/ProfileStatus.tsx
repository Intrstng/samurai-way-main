import React, {FocusEvent, ChangeEvent} from 'react';
import S from './ProfileStatus.module.css';

type ProfileStatusProps = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusProps> {
    // statusInputRef: RefObject<HTMLInputElement> = React.createRef();
    state = {
        editMode: false,
        status: this.props.status
    }
    //onBlur={this.onBlurDeactivateEditModeHandler.bind(this)} or use arrow function
    onBlurDeactivateEditModeHandler = (e: FocusEvent<HTMLInputElement>) => {
        this.setState({
            editMode: false,
           // status: e.currentTarget.value
        })

        this.props.updateStatus(this.state.status);

    }
    //onDoubleClick={this.activateEditModeHandler.bind(this)} or use arrow function
    activateEditModeHandler() {
        this.setState({
            editMode: true,
        })
    }

    onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusProps>, prevState: Readonly<{}>, snapshot?: any) {
        // this.state
        // this.props
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            })
        }
    }

    render() {
        console.log(this.props.status)

        return (
            <div className={S.status}>
                {
                    this.state.editMode ? <input type='text'
                                            value={this.state.status}
                                            className={S.status__input}
                                            onBlur={this.onBlurDeactivateEditModeHandler}
                                            onChange={this.onChangeHandler}
                                            placeholder={!this.state.status ? 'Enter status...' : ''}
                                            autoFocus
                        />
                                        : <span className={S.status__text} onDoubleClick={this.activateEditModeHandler.bind(this)}>{this.props.status || 'Enter your status...'}</span>
                }
            </div>
        );
    }
}