import QuestionExpand from "./components/QuestionExpand";
import { otherQuestions, productQuestions, shippingQuestions } from "./data";

const FaqsPage = () => {
  return (
    <main className="container mx-auto my-10 flex justify-center">
      <section className="w-full max-w-[630px] p-10">
        <div className="mb-8 space-y-6 border-b border-[#BD8F68] pb-6">
          <h1 className="text-4xl font-medium tracking-widest text-primary-500">PRODUCTS</h1>

          <ul>
            {productQuestions.map((group, index) => (
              <QuestionExpand key={index} question={group.question}>
                {group.answer}
              </QuestionExpand>
            ))}
          </ul>
        </div>

        <div className="mb-8 space-y-6 border-b border-[#BD8F68] pb-6">
          <h1 className="text-4xl font-medium tracking-widest text-primary-500">
            SHIPPING & DELIVERY
          </h1>

          <ul>
            {shippingQuestions.map((group, index) => (
              <QuestionExpand key={index} question={group.question}>
                {group.answer}
              </QuestionExpand>
            ))}
          </ul>
        </div>

        <div className="mb-8 space-y-6 border-b border-[#BD8F68] pb-6">
          <h1 className="text-4xl font-medium tracking-widest text-primary-500">OTHERS</h1>

          <ul>
            {otherQuestions.map((group, index) => (
              <QuestionExpand key={index} question={group.question}>
                {group.answer}
              </QuestionExpand>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default FaqsPage;
