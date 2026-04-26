'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DEMO_EMAIL = 'somkheart.k@gmail.com';
const DEMO_PASSWORD = 'password';
const SESSION_KEY = 'smartstore-admin-session';

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.sessionStorage.getItem(SESSION_KEY) === 'active') {
      router.replace('/admin');
    }
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      window.sessionStorage.setItem(SESSION_KEY, 'active');
      router.push('/admin');
      return;
    }

    setErrorMessage('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f1ea] px-5 py-8 text-ink sm:px-6">
      <section className="w-full max-w-[26rem] rounded-[32px] border border-black/6 bg-[#fffdfa] px-7 py-10 shadow-[0_6px_24px_rgba(15,23,42,0.04)] sm:px-9 sm:py-12">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-ink/40">
            Smartstore Admin
          </p>
          <h1 className="mt-5 text-[2rem] font-semibold tracking-[-0.05em] text-ink sm:text-[2.25rem]">
            เข้าสู่ระบบ
          </h1>
        </div>

        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2.5 block text-xs font-medium uppercase tracking-[0.18em] text-ink/55">อีเมล</span>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage('');
              }}
              className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3.5 text-[15px] outline-none transition focus:border-ink/80 focus:ring-4 focus:ring-black/5"
            />
          </label>

          <label className="block">
            <span className="mb-2.5 block text-xs font-medium uppercase tracking-[0.18em] text-ink/55">รหัสผ่าน</span>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrorMessage('');
              }}
              className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3.5 text-[15px] outline-none transition focus:border-ink/80 focus:ring-4 focus:ring-black/5"
            />
          </label>

          {errorMessage ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-ink px-4 py-3.5 text-[15px] font-semibold tracking-[0.01em] text-white transition hover:bg-[#111c2d]"
          >
            เข้าสู่ระบบ
          </button>

          <div className="pt-2">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-black/8" />
              <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-ink/35">
                Secure Access
              </span>
              <span className="h-px flex-1 bg-black/8" />
            </div>

            <p className="mt-4 text-center text-xs leading-6 text-ink/45">
              สำหรับผู้ดูแลระบบร้านค้าเท่านั้น หากเข้าใช้งานไม่ได้ กรุณาติดต่อผู้ดูแลระบบ
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
