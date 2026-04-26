'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SESSION_KEY = 'smartstore-admin-session';

const sidebarSections = [
  {
    title: 'Overview',
    items: ['Dashboard', 'Executive summary', 'Branch performance']
  },
  {
    title: 'Stock Management',
    items: ['คลังสินค้า', 'รับสินค้าเข้า', 'โอนย้ายสต๊อก', 'แจ้งเตือนสินค้าใกล้หมด']
  },
  {
    title: 'POS',
    items: ['หน้าขาย POS', 'เปิด-ปิดกะ', 'คืนสินค้า', 'สรุปยอดแคชเชียร์']
  },
  {
    title: 'Operations',
    items: ['Purchase orders', 'Suppliers', 'Promotions']
  }
];

const dashboardCards = [
  { label: 'ยอดขายวันนี้', value: '฿128,450', detail: '+12.4% จากเมื่อวาน' },
  { label: 'ออเดอร์รอดำเนินการ', value: '36', detail: 'ต้องแพ็กภายใน 2 ชั่วโมง' },
  { label: 'สินค้าที่ต้องเติม', value: '14 SKU', detail: 'สาขาหลักและออนไลน์' }
];

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.sessionStorage.getItem(SESSION_KEY) !== 'active') {
      router.replace('/');
    }
  }, [router]);

  function handleLogout() {
    window.sessionStorage.removeItem(SESSION_KEY);
    router.replace('/');
  }

  return (
    <main className="min-h-screen bg-aura px-5 py-8 text-ink sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[32px] border border-white/40 bg-[#182235] p-6 text-white shadow-panel backdrop-blur sm:p-7 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <div className="border-b border-white/10 pb-6">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/55">Admin Panel</p>
            <h1 className="mt-3 text-2xl font-semibold">Stock / POS Control</h1>
            <p className="mt-3 text-sm leading-7 text-white/65">
              เมนูหลักสำหรับคลังสินค้า หน้าขาย และการบริหารการดำเนินงานของแต่ละสาขา
            </p>
          </div>

          <nav className="mt-6 space-y-6">
            {sidebarSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
                  {section.title}
                </p>
                <div className="mt-3 space-y-2">
                  {section.items.map((item, itemIndex) => {
                    const isActive = sectionIndex === 1 && itemIndex === 0;

                    return (
                      <button
                        key={item}
                        type="button"
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                          isActive
                            ? 'bg-white text-ink shadow-sm'
                            : 'bg-white/5 text-white/78 hover:bg-white/10'
                        }`}
                      >
                        <span>{item}</span>
                        <span className={`${isActive ? 'text-coral' : 'text-white/35'}`}>+</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium text-white/65">Logged in</p>
            <p className="mt-2 text-base font-semibold">somkheart.k@gmail.com</p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
            >
              ออกจากระบบ
            </button>
          </div>
        </aside>

        <div className="rounded-[32px] border border-white/40 bg-white/65 p-6 shadow-panel backdrop-blur sm:p-8 lg:p-10">
          <header className="flex flex-col gap-4 border-b border-ink/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-ink/50">
                Smartstore Operations Center
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Dashboard สำหรับ stock และ POS</h2>
              <p className="mt-3 text-sm leading-7 text-ink/65 sm:text-base">
                ตรวจภาพรวมยอดขาย สต๊อก สถานะหน้าร้าน และงานที่ต้องดำเนินการจากจุดเดียว.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              ทุกสาขาออนไลน์ปกติ
            </div>
          </header>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {dashboardCards.map((card) => (
              <article key={card.label} className="rounded-3xl border border-ink/10 bg-white/80 p-5">
                <p className="text-sm text-ink/55">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold">{card.value}</p>
                <p className="mt-2 text-sm text-ink/65">{card.detail}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[28px] border border-ink/10 bg-[#fffaf4] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink/45">
                    Live Summary
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">ยอดขายตามช่องทาง</h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                  Realtime
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-white p-4">
                  <div className="flex items-center justify-between text-sm text-ink/60">
                    <span>Website</span>
                    <span>64%</span>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-sand">
                    <div className="h-3 w-[64%] rounded-full bg-coral" />
                  </div>
                </div>
                <div className="rounded-3xl bg-white p-4">
                  <div className="flex items-center justify-between text-sm text-ink/60">
                    <span>Marketplace</span>
                    <span>21%</span>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-sand">
                    <div className="h-3 w-[21%] rounded-full bg-ink" />
                  </div>
                </div>
                <div className="rounded-3xl bg-white p-4">
                  <div className="flex items-center justify-between text-sm text-ink/60">
                    <span>Retail branch</span>
                    <span>15%</span>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-sand">
                    <div className="h-3 w-[15%] rounded-full bg-amber-500" />
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-[28px] border border-ink/10 bg-white p-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink/45">
                Priority Queue
              </p>
              <h2 className="mt-2 text-2xl font-semibold">งานที่ควรทำต่อ</h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-ink/10 p-4">
                  <p className="text-base font-semibold">Approve purchase order</p>
                  <p className="mt-2 text-sm leading-6 text-ink/65">
                    Supplier A รออนุมัติ PO สำหรับสินค้ากลุ่ม skincare ภายในวันนี้ 18:00
                  </p>
                </div>
                <div className="rounded-3xl border border-ink/10 p-4">
                  <p className="text-base font-semibold">Check payment exceptions</p>
                  <p className="mt-2 text-sm leading-6 text-ink/65">
                    มี 3 ออเดอร์ที่ชำระเงินไม่สมบูรณ์ และต้องตรวจสอบกับช่องทางโอนเงิน
                  </p>
                </div>
                <div className="rounded-3xl border border-ink/10 p-4">
                  <p className="text-base font-semibold">Restock best sellers</p>
                  <p className="mt-2 text-sm leading-6 text-ink/65">
                    สินค้าขายดี 5 รายการเหลือสต๊อกต่ำกว่า threshold ของสัปดาห์นี้
                  </p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}