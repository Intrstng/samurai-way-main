import React, { FC, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import S from './LoginPage.module.css';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

export const LoginPage = () => {
    const onSubmitHandler = (formData: FormDataType) => {
        console.log(formData)
    }

    return (
        <div className={S.loginPage}>
            <LoginReduxForm onSubmit={onSubmitHandler}/>
        </div>
    );
};


export const LoginForm: FC<InjectedFormProps<FormDataType>> = (props) => {
    const { handleSubmit } = props
    return (
        <div className={S.loginPage}>
            <form action="/action_page.php"
                  className={S.loginForm}
                  onSubmit={handleSubmit}>

                <label htmlFor="login">Login:</label>
                <Field component={'input'}
                       type="text"
                       id="login"
                       name="login"
                       autoComplete="login"
                       required/>

                <label htmlFor="password">Password:</label>
                <Field component={'input'}
                       type="password"
                       id="password"
                       name="password"
                       autoComplete="current-password"
                       required/>


                <label><Field component={'input'}
                              type="checkbox" id="remember"
                              name="rememberMe"/>
                    Remember me
                </label>

                <input type="submit" value="Login"/>
            </form>
        </div>
    );
}

const LoginReduxForm = reduxForm<FormDataType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)