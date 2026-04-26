const purchaseOrders = [
  { po: 'PO-240426-01', supplier: 'Supplier A', amount: '฿48,000', status: 'Pending approval' },
  { po: 'PO-240426-02', supplier: 'Supplier B', amount: '฿22,500', status: 'Waiting delivery' },
  { po: 'PO-240426-03', supplier: 'Supplier C', amount: '฿74,300', status: 'Draft' }
];

export default function AdminPurchaseOrdersPage() {
  return (
    <>
      <header className="flex flex-col gap-4 border-b border-ink/10 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-ink/50">Operations</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Purchase Orders</h2>
          <p className="mt-3 text-sm leading-7 text-ink/65 sm:text-base">
            ติดตามใบสั่งซื้อ supplier สถานะการอนุมัติ และมูลค่าที่กำลังจะเข้าคลัง.
          </p>
        </div>

        <button
          type="button"
          className="rounded-2xl bg-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0c1727]"
        >
          Create new PO
        </button>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-ink/10 bg-white/80 p-5">
          <p className="text-sm text-ink/55">Pending approvals</p>
          <p className="mt-3 text-3xl font-semibold">3</p>
          <p className="mt-2 text-sm text-ink/65">ต้องตรวจสอบภายในวันนี้</p>
        </article>
        <article className="rounded-3xl border border-ink/10 bg-white/80 p-5">
          <p className="text-sm text-ink/55">This week spend</p>
          <p className="mt-3 text-3xl font-semibold">฿144,800</p>
          <p className="mt-2 text-sm text-ink/65">รวมคำสั่งซื้อที่ปล่อยแล้ว</p>
        </article>
        <article className="rounded-3xl border border-ink/10 bg-white/80 p-5">
          <p className="text-sm text-ink/55">Suppliers active</p>
          <p className="mt-3 text-3xl font-semibold">12</p>
          <p className="mt-2 text-sm text-ink/65">มีรอบส่งของในสัปดาห์นี้</p>
        </article>
      </section>

      <section className="mt-8 rounded-[28px] border border-ink/10 bg-white p-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink/45">Supplier Pipeline</p>
        <h3 className="mt-2 text-2xl font-semibold">รายการใบสั่งซื้อ</h3>

        <div className="mt-6 space-y-4">
          {purchaseOrders.map((order) => (
            <article key={order.po} className="rounded-3xl border border-ink/10 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-base font-semibold">{order.po}</p>
                  <p className="mt-1 text-sm text-ink/60">{order.supplier}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#fffaf4] px-3 py-1 text-sm font-medium text-ink/70">
                    {order.status}
                  </span>
                  <span className="text-base font-semibold">{order.amount}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}