const openRegisters = [
  { counter: 'POS-01', cashier: 'Mint', shift: '08:00 - 17:00', status: 'Open' },
  { counter: 'POS-02', cashier: 'Beam', shift: '10:00 - 19:00', status: 'Open' },
  { counter: 'POS-03', cashier: 'Nida', shift: '12:00 - 21:00', status: 'Closing soon' }
];

export default function AdminPosPage() {
  return (
    <>
      <header className="flex flex-col gap-4 border-b border-ink/10 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-ink/50">POS Operations</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">จัดการหน้าขายและกะพนักงาน</h2>
          <p className="mt-3 text-sm leading-7 text-ink/65 sm:text-base">
            ติดตามสถานะเครื่อง POS ยอดขายต่อกะ และงานที่เกี่ยวข้องกับการคืนสินค้าและการปิดยอด.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          3 counters online
        </div>
      </header>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_340px]">
        <article className="rounded-[28px] border border-[#efeae1] bg-[#faf8f4] p-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink/45">Cashier Shift Status</p>
          <h3 className="mt-2 text-2xl font-semibold">เครื่องที่กำลังเปิดใช้งาน</h3>

          <div className="mt-6 space-y-4">
            {openRegisters.map((register) => (
              <div key={register.counter} className="rounded-3xl border border-[#f2ede5] bg-[#fdfcf9] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold">{register.counter}</p>
                    <p className="mt-1 text-sm text-ink/60">Cashier: {register.cashier}</p>
                  </div>
                  <span className="rounded-full bg-[#f8f5ef] px-3 py-1 text-sm font-medium text-ink/70">
                    {register.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-ink/65">Shift: {register.shift}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] border border-[#efeae1] bg-[#faf8f4] p-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink/45">Today</p>
          <h3 className="mt-2 text-2xl font-semibold">POS summary</h3>

          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-[#f2ede5] bg-[#fdfcf9] p-4">
              <p className="text-sm text-ink/55">Transactions</p>
              <p className="mt-2 text-3xl font-semibold">214</p>
            </div>
            <div className="rounded-3xl border border-[#f2ede5] bg-[#fdfcf9] p-4">
              <p className="text-sm text-ink/55">Average basket</p>
              <p className="mt-2 text-3xl font-semibold">฿1,280</p>
            </div>
            <div className="rounded-3xl border border-[#f2ede5] bg-[#fdfcf9] p-4">
              <p className="text-sm text-ink/55">Returns pending review</p>
              <p className="mt-2 text-3xl font-semibold">5</p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
