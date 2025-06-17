"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { regInitialValues, registerValidationSchema } from "@/ui/components/forms/auth/yupshemas";
import Link from "next/link";
import {useRegister} from "@/ui/components/forms/auth/hooks/useRegister";

const RegisterForm = () => {
    const { handleRegister } = useRegister();

    return (
        <div className="max-w-md mx-auto mt-10 p-6 shadow rounded border">
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            <Formik
                initialValues={regInitialValues}
                validationSchema={registerValidationSchema}
                onSubmit={(values, { setSubmitting}) => {
                    handleRegister(values, setSubmitting);
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
                            <label htmlFor="username" className="block">Username</label>
                            <Field
                                name="username"
                                id="username"
                                className="w-full p-2 border rounded"
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
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

                        <div>
                            <label htmlFor="confirmPassword" className="block">Confirm password</label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="w-full p-2 border rounded"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            disabled={isSubmitting}
                        >
                            Register
                        </button>
                        <Link href="/login" className="text-blue-600 hover:underline ml-4">
                            Already have an account?
                        </Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;
