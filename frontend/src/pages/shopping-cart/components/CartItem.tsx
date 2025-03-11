const CartItem = () => {
  return (
    <div className="flex justify-between border-y py-8">
      <div className="flex gap-10 items-center">
        <img
          src="../../../public/cakes/image/Berry_truffle/BerryTruffle1.jpg"
          alt=""
          className="aspect-square w-28"
        />

        <div>
          <h3 className="text-xl font-medium uppercase text-primary-400">Berry Truffle</h3>
          <p className="uppercase text-primary-200">6 pieces</p>
          <p className="font-xl uppercase text-primary-400">$25.00</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium tracking-widest text-primary-400">QUANTITY:</span>

        <div className="flex items-center gap-3 rounded border border-primary-100 px-4 py-3">
          <button className="relative flex h-4 w-4">
            <span className="absolute left-1/2 top-1/2 block h-[1px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-primary-300" />
          </button>
          <span className="text-primary-500">1</span>
          <button className="relative flex h-4 w-4">
            <span className="absolute left-1/2 top-1/2 block h-[1px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-primary-300" />
            <span className="absolute left-1/2 top-1/2 block h-[1px] w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-primary-300" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-primary-400">
        <span>TOTAL:</span>
        <span>7,80 $</span>
      </div>

      <div className="flex items-center">
        <button className="relative flex h-4 w-4 rotate-45 rounded-full border border-primary-100 p-5">
          <span className="absolute left-1/2 top-1/2 block h-[1px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-primary-300" />
          <span className="absolute left-1/2 top-1/2 block h-[1px] w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-primary-300" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
