import * as React from 'react';
import './LoginPage.css'
import { authActions } from '../../redux/userSlice'
import { useAppDispatch } from '../../app/hooks'
import { FastField, Form, Formik } from 'formik';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import { InputFieldLogin } from '../../component/customField/inputField';
import axios from 'axios';

export interface LoginPageProps {
}

export function LoginPage(props: LoginPageProps) {

    const dispatch = useAppDispatch();

    const initialValues = {
        DisplayName: '',
        Password: '',
    }

    const validationSchema = Yup.object().shape({
        DisplayName: Yup.string().required("This field is required"),
        Password: Yup.string().min(6, 'Password must be at least 6 characters').required("This field is required")
    })

    const handelLogin = async (values: any, actions: any) => {
        const params = {
            displayName: values.DisplayName.trim(),
            password: values.Password.trim(),
        }

        try {
            const res = await axios.post('/v1/user/login', params).then(function (response) {
                return response;

            }).catch(function (error) {
                return error.response;
            });

            if (res.status === 200) {
                // loginSuccess();

                dispatch(authActions.loginStart(params))
            } else {
                dispatch(authActions.loginStart(params))
                setTimeout(() => {
                    actions.setSubmitting(false);
                }, 5000)

            }

        } catch (error) {

            console.log(error);
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col space-y-5 items-center mt-20">

            <h1 className="font-bold text-3xl">Sign In</h1>
            <div className="w-1/4">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        handelLogin(values, actions);
                        actions.setStatus("Login");
                    }}
                    enableReinitialize={false}
                    validateOnChange={true}
                    validateOnBlur={true}
                // validateOnMount={true}

                >
                    {formikProps => {
                        const { values, errors, } = formikProps;


                        // console.log(formikProps.isSubmitting);
                        // console.log(errors);

                        // console.log(status);
                        return (
                            <Form  >
                                <FastField
                                    // setStatus={false}
                                    name="DisplayName"
                                    type="text"
                                    component={InputFieldLogin}
                                    label="DisplayName"
                                    placeholder="DisplayName"
                                    onChange={values.DisplayName}
                                    invalid={errors.DisplayName}
                                />
                                <FastField
                                    name="Password"
                                    type="password"
                                    component={InputFieldLogin}
                                    label="PassWord"
                                    placeholder="PassWord"


                                    invalid={errors.Password}
                                    onChange={values.Password}
                                />
                                <FormGroup>
                                    <Button className="bg-red-400 w-full p-1 my-3 rounded-md text-gray-500 text-base font-semibold active:bg-red-600 btnBootstrap" type="submit" disabled={!formikProps.isValid}  >
                                        {formikProps.isSubmitting && <Spinner size="sm" className="bootstrapSpinner" />}
                                        Login
                                    </Button>
                                </FormGroup>
                            </Form>
                        )
                    }
                    }
                </Formik>
            </div>
        </div>
    );
}
