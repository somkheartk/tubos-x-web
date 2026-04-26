const stockItems = [
  { sku: 'SKU-001', product: 'Hydra Serum 30ml', onHand: 24, reorderPoint: 18, branch: 'HQ Warehouse' },
  { sku: 'SKU-014', product: 'Sun Shield SPF50', onHand: 11, reorderPoint: 20, branch: 'Siam Branch' },
  { sku: 'SKU-031', product: 'Night Repair Mask', onHand: 42, reorderPoint: 15, branch: 'Online Fulfillment' }
];

export default function AdminStockPage() {
  return (
    <>
      <header className="flex flex-col gap-4 border-b border-ink/10 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-ink/50">Stock Management</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">ภาพรวมคลังสินค้า</h2>
          <p className="mt-3 text-sm leading-7 text-ink/65 sm:text-base">
            ตรวจยอดคงเหลือ จุดสั่งซื้อใหม่ และการกระจายสินค้าแต่ละคลังจากหน้าศูนย์กลางเดียว.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
          4 SKU ต่ำกว่า reorder point
        </div>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-ink/10 bg-white/80 p-5">
          <p className="text-sm text-ink/55">Total SKUs</p>
          <p className="mt-3 text-3xl font-semibold">248</p>
          <p className="mt-2 text-sm text-ink/65">ครอบคลุมทุกคลังและทุกสาขา</p>
        </article>
        <article className="rounded-3xl border border-ink/10 bg-white/80 p-5">
          <p className="text-sm text-ink/55">Inbound today</p>
          <p className="mt-3 text-3xl font-semibold">16 lots</p>
          <p className="mt-2 text-sm text-ink/65">รอรับเข้า 2 suppliers</p>
        </article>
        <article className="rounded-3xl border border-ink/10 bg-white/80 p-5">
          <p className="text-sm text-ink/55">Transfer requests</p>
          <p className="mt-3 text-3xl font-semibold">7</p>
          <p className="mt-2 text-sm text-ink/65">ระหว่างสาขาและคลังหลัก</p>
        </article>
      </section>

      <section className="mt-8 rounded-[28px] border border-ink/10 bg-white p-6">
        <div className="flex flex-col gap-3 border-b border-ink/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink/45">Low Stock Watch</p>
            <h3 className="mt-2 text-2xl font-semibold">สินค้าที่ต้องติดตาม</h3>
          </div>
          <button
            type="button"
            className="rounded-2xl border border-ink/10 bg-[#fffaf4] px-4 py-3 text-sm font-medium text-ink"
          >
            Export inventory report
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-ink/45">
                <th className="px-4">SKU</th>
                <th className="px-4">สินค้า</th>
                <th className="px-4">คงเหลือ</th>
                <th className="px-4">Reorder</th>
                <th className="px-4">คลัง/สาขา</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item) => (
                <tr key={item.sku} className="rounded-2xl bg-[#fffaf4] text-sm text-ink/80">
                  <td className="rounded-l-2xl px-4 py-4 font-medium">{item.sku}</td>
                  <td className="px-4 py-4">{item.product}</td>
                  <td className="px-4 py-4">{item.onHand}</td>
                  <td className="px-4 py-4">{item.reorderPoint}</td>
                  <td className="rounded-r-2xl px-4 py-4">{item.branch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
