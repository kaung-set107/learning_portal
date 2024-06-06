/* eslint-disable react/prop-types */
import CustomButton from '../../../../components/general/CustomButton';
import CustomCard from '../../../../components/general/CustomCard';
import ListDetail from '../../../../components/general/typography/ListDetail';
import ListInfo from '../../../../components/general/typography/ListInfo';
import QuestionList from '../../../questions/components/QuestionList';
import { v4 as uuidv4 } from 'uuid';

const SectionCard = (props) => {
  const {
    fixedQuestionTypes,
    getActionHandlers,
    sectionData,
    removeSectionData,
    removeParagraph,
    sectionIndex,
    updateQuestions,
    removeQuestion,
    getSectionDataUpdateButton,
    getParagraphUpdateButton,
    successCallback,
    srcId,
    imageUploadApi,
  } = props;

  return (
    <>
      {getActionHandlers(sectionIndex)}
      <div className="space-y-3">
        {sectionData.instruction && (
          <CustomCard className="bg-white relative border-yellow-400">
            <ListInfo title="Instruction" />
            <ListDetail title={sectionData.instruction} />
            <div className="absolute right-2 top-2 flex gap-3">
              {getSectionDataUpdateButton(sectionIndex, 'instruction')}
              <CustomButton
                iconOnly
                confirmBox
                type="delete"
                className="bg-opacity-50"
                onClick={() => removeSectionData(sectionIndex, 'instruction')}
                title="Remove"
              />
            </div>
          </CustomCard>
        )}
        {sectionData.expanded && (
          <>
            {sectionData.paragraph && sectionData.paragraph.length > 0 && (
              <CustomCard className="bg-white relative border-green-500">
                <div className="flex justify-between items-center mb-3">
                  <ListInfo title="Paragraph" />
                  <div>
                    <CustomButton
                      iconOnly
                      confirmBox
                      type="delete"
                      className="bg-opacity-50"
                      onClick={() =>
                        removeSectionData(sectionIndex, 'paragraph')
                      }
                      title="Remove"
                    />
                  </div>
                </div>
                <hr />
                {/* <ListDetail title={sectionData.paragraph} /> */}
                <div className="my-3 space-y-3">
                  {sectionData.paragraph.map((each, paragraphIndex) => {
                    return (
                      <div key={uuidv4()} className="relative">
                        <CustomCard className="min-h-[100px]">
                          <div className="flex justify-end gap-3 mb-3">
                            {getParagraphUpdateButton(sectionIndex, {
                              key: paragraphIndex,
                              value: each,
                            })}
                            <CustomButton
                              iconOnly
                              confirmBox
                              type="delete"
                              className="bg-opacity-50"
                              onClick={() =>
                                removeParagraph(sectionIndex, paragraphIndex)
                              }
                              title="Remove"
                            />
                          </div>
                          <p>{each}</p>
                        </CustomCard>
                      </div>
                    );
                  })}
                </div>
              </CustomCard>
            )}
            {sectionData.questions && (
              <>
                <CustomCard className="bg-white relative border-blue-500">
                  <div className="flex justify-between items-center mb-3">
                    <ListInfo title="Questions" />
                    <CustomButton
                      iconOnly
                      confirmBox
                      type="delete"
                      className="bg-opacity-50"
                      onClick={() =>
                        removeSectionData(sectionIndex, 'questions')
                      }
                      title="Remove"
                    />
                  </div>
                  <div className="max-h-[500px] overflow-y-scroll">
                    <QuestionList
                      fixedQuestionTypes={fixedQuestionTypes}
                      successCallback={successCallback}
                      srcId={srcId}
                      imageUploadApi={imageUploadApi}
                      questions={sectionData.questions}
                      updateQuestions={(questionIndex, payload) =>
                        updateQuestions(sectionIndex, questionIndex, payload)
                      }
                      removeQuestion={(questionIndex) =>
                        removeQuestion(sectionIndex, questionIndex)
                      }
                    />
                  </div>
                </CustomCard>
              </>
            )}

            {!(sectionData.questions?.length > 0) && (
              <div className="h-[400px] flex justify-center items-center">
                No Data!
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SectionCard;
