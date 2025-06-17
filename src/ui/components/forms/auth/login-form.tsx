"use client"
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginInitialValues, loginValidationSchema } from "@/ui/components/forms/auth/yupshemas";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import {useLogin} from "@/ui/components/forms/auth/hooks/useLogin";

const LoginForm = () => {
    const { user } = useUserStore();
    const { handleLogin } = useLogin();

    return (
        !user.isAuth ? (
            <div className="max-w-md mx-auto mt-10 p-6 shadow rounded border">
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                <Formik
                    initialValues={loginInitialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleLogin(values, setSubmitting);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full p-2 border rounded"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full p-2 border rounded"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 block text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Login
                            </button>

                            <Link href="/register" className="text-blue-600 hover:underline ml-4">
                                Зареєструватись
                            </Link>
                        </Form>
                    )}
                </Formik>
            </div>
        ) : (
            <div>Вже авторизовані</div>
        )
    );
};

export default LoginForm;
