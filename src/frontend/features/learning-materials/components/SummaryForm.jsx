/* eslint-disable react/prop-types */
import { Textarea, Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import CustomFileDrag from "../../../components/general/CustomFileDrag";
import { learningMaterialApi } from "../api";
import FileLoader from "../../../components/general/FileLoader";
import { showError, showSuccess } from "../../../../util/noti";
import SubHeading from "../../../components/general/typography/SubHeading";

export default function SummaryForm(props) {
  const { learningMaterial, successCallback } = props;

  const variant = "bordered";
  const [formData, setFormData] = useState({
    _id: learningMaterial._id,
    summaryNote: "",
    summaryFile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousSummaryFiles, setPreviousSummaryFiles] = useState([]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log("submitting");
      console.log(formData);

      const res = await learningMaterialApi.update({ ...formData });
      await successCallback();
      console.log(res);
      showSuccess({ text: "Summary is updated", type: "noti-box" });
    } catch (error) {
      console.log("error");
      showError({ axiosResponse: error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssetChange = (value) => {
    console.log(value);
    setFormData((prev) => ({ ...prev, summaryFile: value }));
  };

  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, summaryNote: learningMaterial.summaryNote };
    });
    setPreviousSummaryFiles(learningMaterial.summaryFile);
  }, [learningMaterial]);

  return (
    <>
      <Card>
        <CardBody>
          <SubHeading title="Summary Form" />
          <form>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-3 gap-4 mt-3">
              <Textarea
                type="text"
                label="Summary Note"
                placeholder="Summary Note"
                variant={variant}
                value={formData.summaryNote}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    summaryNote: e.target.value,
                  }))
                }
                labelPlacement="outside"
              />
            </div>

            {previousSummaryFiles && (
              <div className="mb-3">
                <label className="font-semibold mb-2 block">
                  Uploaded Summary File
                </label>
                <div>
                  <div className="border p-2 rounded-xl">
                    <div className="bg-gray-100 p-3 rounded-xl border">
                      {previousSummaryFiles?.length > 0 && (
                        <FileLoader file={previousSummaryFiles[0]} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-3">
              <label className="font-semibold mb-2 block">Summary File</label>

              <CustomFileDrag
                id="summaryFile"
                handleChange={handleAssetChange}
                name="summaryFile"
              />
            </div>

            <CustomButton
              onClick={handleSubmit}
              color="primary"
              isLoading={isSubmitting}
              title="Update"
            />
          </form>
        </CardBody>
      </Card>
    </>
  );
}
