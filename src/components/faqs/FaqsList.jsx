import FaqItem from "./FaqItem";

const FaqsList = ({ faqs }) => {
  return (
    <div className="lg:col-span-2">
      {faqs.map((faq) => (
        <FaqItem faq={faq} key={faq._id} />
      ))}
    </div>
  );
};

export default FaqsList;
