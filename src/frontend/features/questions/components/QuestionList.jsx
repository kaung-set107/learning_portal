/* eslint-disable react/prop-types */
import { Card, CardBody } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";

const QuestionList = (props) => {
  const { questions } = props;
  console.log(questions);
  return (
    <div>
      <Card>
        <CardBody>
          {questions &&
            questions.map((question) => {
              return <div key={uuidv4()}>{JSON.stringify(question)}</div>;
            })}
          {!(questions.length > 0) && (
            <div className="h-[400px] flex justify-center items-center">
              No Data!
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default QuestionList;
