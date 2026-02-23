'use client';

import { useFormik } from "formik";
import { useState } from "react";
import { LoginInfo } from "../_lib/definition";
import * as Yup from 'yup';
import { useLoginSubmit } from "../_hooks/useSubmit";
import { Spinner } from '@heroui/react';
import WhiteLogo from '@/app/_assets/icons/quizora-white.svg';
import BlueLogo from '@/app/_assets/icons/quizora-blue.svg';

export function Login() {
  const { isLoading, response, submit } = useLoginSubmit();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      const data: LoginInfo = { email: values.email, password: values.password };
      submit(data);
    },
    validationSchema:
      Yup.object({
        email: Yup.string().email("Please enter a valid email address.").required("Email is required."),
        password: Yup.string().min(6, "Must be at least 6 characters").required("Password is required.")
      })
  });

  const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);

  return (
    <>
      <div className="md:flex md:flex-col gap-8 items-center justify-center relative h-screen md:w-1/2 mb-12 md:mb-0">
        <WhiteLogo
          alt={"Quizora Logo"}
          width={435}
          height={89}
          className="invisible md:visible z-10 w-32 md:w-full lg:w-80 h-auto"
        />
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/login-bg.png')] blur-md scale-100"></div>
        <div className="absolute inset-0 bg-[var(--theme-blue)]/50 scale-y-110 md:scale-100"></div>
        <p className={`text-base text-white text-center md:text-3xl relative z-10 p-6`}>
          Used this info to try it yourself!<br /><br />
          <b>Email:</b> lunaDuck@gmail.com<br />
          <b>Password:</b> lunaDuck123456<br />
        </p>
      </div>

      <div className="flex flex-col gap-8 items-center justify-center md:w-1/2 md:h-screen relative">
        <BlueLogo
          alt="Quizora logo"
          width={435}
          height={89}
          className="w-48 h-auto md:w-36 md:absolute md:top-18 md:left-29"
        />

        <div className="flex flex-col items-center md:w-106">
          <h1 className={`text-[var(--theme-blue)] font-bold text-2xl md:text-3xl`}>Login to your Account</h1>
          <h2 className={`text-[var(--theme-blue)] text-lg`}>with your registered Email Address</h2><br /><br />
          <form onSubmit={formik.handleSubmit} className="flex flex-col items-center pb-8 md:pb-0 gap-5">
            <div className="flex flex-col gap-3 w-76 md:w-full">
              <label htmlFor="email" className={`text-[var(--theme-grey)] text-base font-semibold`}>Email address*</label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                value={formik.values.email}
                placeholder="Enter email address"
                className="h-16 pl-8 text-sm text-[var(--theme-blue)] font-semibold shadow-xl rounded-lg"
              />
              {formik.errors.email && formik.touched.email ? <div className="text-[var(--theme-red)]">{formik.errors.email}</div> : null}
            </div>

            <div className="flex flex-col gap-3 w-76 md:w-106">
              <label htmlFor="password" className={`text-[var(--theme-grey)] text-base font-semibold`}>Enter password*</label>
              <span className="relative">
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  value={formik.values.password}
                  placeholder="Password"
                  className="w-full h-16 pl-8 text-sm text-[var(--theme-blue)] font-semibold shadow-xl rounded-lg"
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute inset-y-0 end-9 z-20 flex items-center text-xs"
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </span>
              {formik.errors.password && formik.touched.password ? <div className="text-[var(--theme-red)]">{formik.errors.password}</div> : null}
            </div>
            {response.type === 'error' ? <div className="text-[var(--theme-red)]">{response.message}</div> : null}<br /><br />
            <button
              disabled={isLoading ? true : false}
              type="submit"
              className="w-full flex items-center justify-center bg-[var(--theme-blue)] text-white text-lg h-16 rounded-lg p-4 
              disabled:bg-[var(--theme-grey)] 
              hover:bg-white hover:text-[var(--theme-blue)] hover:border hover:border-[var(--theme-blue)]"
            >
              {isLoading ? <Spinner size="lg" className="text-white" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}