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
            {sidebarSections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/35">
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
                            ? 'bg-white text-ink shadow-sm'
                            : 'bg-white/5 text-white/78 hover:bg-white/10'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className={`${isActive ? 'text-coral' : 'text-white/35'}`}>+</span>
                      </Link>
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
          {children}
        </div>
      </div>
    </main>
  );
}
