const Question = ({ question, answer }) => {
  return (
    <div>
      <h2>{question}</h2>
      <h5>{answer}</h5>
    </div>
  );
};

export default Question;
