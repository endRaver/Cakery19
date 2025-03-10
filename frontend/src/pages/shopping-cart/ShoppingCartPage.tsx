import AnimatedUnderline from "./components/AnimationUnderline";

const ShoppingCartPage = () => {
  return (
    <div className="space-y-10 lg:space-y-[60px]">
      <section className="container mx-auto my-20">
        <div className="flex items-end justify-between">
          <h2 className="text-center text-2xl font-light text-primary-500 sm:text-3xl sm:leading-[46px]">
            Shopping Cart
          </h2>

          <a href="/shop">
            <AnimatedUnderline>
              <p className="lg:text-md text-center text-sm font-medium tracking-wider text-primary-300 sm:text-sm">
                CONTINUE MY SHOPPING
              </p>
            </AnimatedUnderline>
          </a>
        </div>
      </section>

      <section className="container mx-auto my-20 mt-8">
        <div className="flex justify-between">
          <img
            src="../../../public/cakes/image/Berry_truffle/BerryTruffle1.jpg"
            alt=""
            className="aspect-square w-28"
          />

          <div>
            <h3 className="text-xl font-medium text-primary-500">Berry Truffle</h3>
            <p className="text-primary-200">6 pieces</p>
            <p className="font-xl text-primary-500">$25.00</p>
          </div>

          <div className="flex items-center">
            <p>Quantity:</p>

            <div></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCartPage;
