import useMediaLoader from "@/hooks/useMediaLoader";
import QuestionExpand from "./components/QuestionExpand";
import { otherQuestions, productQuestions, shippingQuestions } from "./data";
import LoadingScreen from "@/components/LoadingScreen";

const FaqsPage = () => {
  const isLoadingMedia = useMediaLoader();

  return (
    <>
      {isLoadingMedia && <LoadingScreen />}
      <main className="container mx-auto my-10 flex justify-center">
        <section className="w-full max-w-[630px] md:p-10">
          <div className="mb-5 space-y-5 border-b border-[#BD8F68] pb-6 sm:mb-8 sm:space-y-6">
            <h1 className="text-center text-2xl font-medium tracking-widest text-primary-500 sm:text-4xl md:text-left">
              PRODUCTS
            </h1>

            <ul>
              {productQuestions.map((group, index) => (
                <QuestionExpand key={index} question={group.question}>
                  {group.answer}
                </QuestionExpand>
              ))}
            </ul>
          </div>

          <div className="mb-5 space-y-5 border-b border-[#BD8F68] pb-6 sm:mb-8 sm:space-y-6">
            <h1 className="text-center text-2xl font-medium tracking-widest text-primary-500 sm:text-4xl md:text-left">
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

          <div className="mb-5 space-y-5 border-b border-[#BD8F68] pb-6 sm:mb-8 sm:space-y-6">
            <h1 className="text-center text-2xl font-medium tracking-widest text-primary-500 sm:text-4xl md:text-left">
              OTHERS
            </h1>

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
    </>
  );
};

export default FaqsPage;
