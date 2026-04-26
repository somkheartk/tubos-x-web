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
    <main className="min-h-screen bg-aura px-5 py-8 text-ink sm:px-8 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/40 bg-white/60 shadow-panel backdrop-blur md:grid-cols-[1.15fr_0.85fr]">
        <section className="relative flex flex-col justify-between overflow-hidden px-7 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
          <div className="absolute left-0 top-0 h-48 w-48 -translate-x-1/3 -translate-y-1/3 rounded-full bg-coral/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-full bg-ink/10 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm font-medium">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Smartstore Control
            </div>

            <div className="mt-10 max-w-xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-ink/55">
                Retail operations dashboard
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                เข้าสู่ระบบเพื่อจัดการร้านค้า การขาย และสต๊อกในที่เดียว
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-ink/70 sm:text-lg">
                ระบบนี้ออกแบบให้แยก frontend และ backend เพื่อพร้อม deploy บน Google Cloud Run
                และรองรับการขยาย service ตามการใช้งานจริง.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-ink/10 bg-white/70 p-5">
              <p className="text-sm text-ink/55">Orders today</p>
              <p className="mt-3 text-3xl font-semibold">128</p>
            </div>
            <div className="rounded-3xl border border-ink/10 bg-white/70 p-5">
              <p className="text-sm text-ink/55">Conversion</p>
              <p className="mt-3 text-3xl font-semibold">4.8%</p>
            </div>
            <div className="rounded-3xl border border-ink/10 bg-white/70 p-5">
              <p className="text-sm text-ink/55">Live branches</p>
              <p className="mt-3 text-3xl font-semibold">12</p>
            </div>
          </div>
        </section>

        <section className="flex items-center border-t border-ink/10 bg-[#fffaf4]/90 px-6 py-8 sm:px-8 md:border-l md:border-t-0 lg:px-10">
          <div className="w-full">
            <div className="mx-auto max-w-md">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-ink/50">
                Login
              </p>
              <h2 className="mt-3 text-3xl font-semibold">ยินดีต้อนรับกลับ</h2>
              <p className="mt-3 text-sm leading-7 text-ink/65">
                ใช้อีเมลและรหัสผ่านของทีมงานเพื่อเข้าถึง dashboard และจัดการข้อมูลร้านค้า.
              </p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink/80">อีเมล</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrorMessage('');
                    }}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/15"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink/80">รหัสผ่าน</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrorMessage('');
                    }}
                    className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/15"
                  />
                </label>

                <div className="rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-ink/75">
                  Demo login: {DEMO_EMAIL} / {DEMO_PASSWORD}
                </div>

                {errorMessage ? (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </p>
                ) : null}

                <div className="flex items-center justify-between gap-4 text-sm text-ink/65">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-ink/20 text-coral focus:ring-coral" />
                    จดจำการเข้าสู่ระบบ
                  </label>
                  <a href="#" className="font-medium text-coral transition hover:text-[#e15b38]">
                    ลืมรหัสผ่าน?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-ink px-4 py-3 text-base font-semibold text-white transition hover:bg-[#0c1727]"
                >
                  เข้าสู่ระบบและไปที่ Admin Panel
                </button>
              </form>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-medium text-ink transition hover:border-ink/20"
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-medium text-ink transition hover:border-ink/20"
                >
                  Continue with SSO
                </button>
              </div>

              <p className="mt-6 text-sm text-ink/60">
                ยังไม่มีบัญชี? <a href="#" className="font-semibold text-coral">ติดต่อผู้ดูแลระบบ</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
