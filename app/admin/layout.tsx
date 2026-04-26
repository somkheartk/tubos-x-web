'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const SESSION_KEY = 'smartstore-admin-session';

type AdminRoute = Route<'/admin' | '/admin/stock' | '/admin/pos' | '/admin/purchase-orders'>;

const sidebarSections = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin' },
      { label: 'Executive summary', href: '/admin' },
      { label: 'Branch performance', href: '/admin' }
    ]
  },
  {
    title: 'Stock Management',
    items: [
      { label: 'คลังสินค้า', href: '/admin/stock' },
      { label: 'รับสินค้าเข้า', href: '/admin/stock' },
      { label: 'โอนย้ายสต๊อก', href: '/admin/stock' },
      { label: 'แจ้งเตือนสินค้าใกล้หมด', href: '/admin/stock' }
    ]
  },
  {
    title: 'POS',
    items: [
      { label: 'หน้าขาย POS', href: '/admin/pos' },
      { label: 'เปิด-ปิดกะ', href: '/admin/pos' },
      { label: 'คืนสินค้า', href: '/admin/pos' },
      { label: 'สรุปยอดแคชเชียร์', href: '/admin/pos' }
    ]
  },
  {
    title: 'Operations',
    items: [
      { label: 'Purchase orders', href: '/admin/purchase-orders' },
      { label: 'Suppliers', href: '/admin/purchase-orders' },
      { label: 'Promotions', href: '/admin/purchase-orders' }
    ]
  }
] as const satisfies ReadonlyArray<{
  title: string;
  items: ReadonlyArray<{
    label: string;
    href: AdminRoute;
  }>;
}>;

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
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
    <main className="min-h-screen bg-[#f6f3ed] text-ink">
      <div className="grid min-h-screen lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="border-b border-[#ece7de] bg-white p-6 text-ink sm:p-7 lg:min-h-screen lg:border-b-0 lg:border-r lg:border-r-[#ece7de] lg:px-8 lg:py-10">
          <div className="border-b border-[#f1ede6] pb-6">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-ink/40">Admin Panel</p>
            <h1 className="mt-3 text-2xl font-semibold">Stock / POS Control</h1>
            <p className="mt-3 text-sm leading-7 text-ink/50">
              เมนูหลักสำหรับคลังสินค้า หน้าขาย และการบริหารการดำเนินงานของแต่ละสาขา
            </p>
          </div>

          <nav className="mt-6 space-y-6">
            {sidebarSections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-ink/35">
                  {section.title}
                </p>
                <div className="mt-3 space-y-2">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={`${section.title}-${item.label}`}
                        href={item.href}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                          isActive
                            ? 'border border-transparent bg-[#f9f7f2] pl-3 text-ink'
                            : 'border border-transparent bg-transparent text-ink/68 hover:bg-[#faf8f4] hover:text-ink'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`block h-5 w-[3px] rounded-full ${
                              isActive ? 'bg-coral' : 'bg-transparent'
                            }`}
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className={`${isActive ? 'text-coral' : 'text-ink/25'}`}>+</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-[#f0ebe3] bg-[#fcfbf8] p-4">
            <p className="text-sm font-medium text-ink/50">Logged in</p>
            <p className="mt-2 text-base font-semibold">somkheart.k@gmail.com</p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 w-full rounded-2xl border border-[#ece5d9] bg-white px-4 py-3 text-sm font-medium text-ink transition hover:bg-[#f8f6f1]"
            >
              ออกจากระบบ
            </button>
          </div>
        </aside>

        <section className="min-w-0 bg-[linear-gradient(180deg,#fbfaf7_0%,#f5f1ea_100%)]">
          <div className="border-b border-[#efeae1] bg-[#fbfaf7]/94 px-6 py-5 backdrop-blur sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-ink/45">
                  Smartstore Admin Suite
                </p>
                <p className="mt-2 text-2xl font-semibold text-ink">Full-screen operations workspace</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 font-medium text-emerald-700">
                  All services healthy
                </span>
                <span className="rounded-full border border-[#efeae1] bg-[#fdfcf9] px-4 py-2 font-medium text-ink/70">
                  Asia Southeast 1
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
