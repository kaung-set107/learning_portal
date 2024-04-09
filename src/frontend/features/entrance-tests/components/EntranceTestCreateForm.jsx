/* eslint-disable react/prop-types */
import { Input, Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import CustomButton from "../../../components/general/CustomButton";
import SubHeading from "../../../components/general/typography/SubHeading";
import { entranceTestsApi } from "../api";
import { showError, showSuccess } from "../../../../util/noti";
import { dateForInput } from "../../../../util/Util";
import { useParams } from "react-router";

const EntranceTestCreateForm = (props) => {
  const { successCallback } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();

  const variant = "bordered";

  const [formData, setFormData] = useState({
    subject: id,
    title: "testing",
    description: "",
    entranceTestDate: "",
  });

  const preparePayload = () => {
    let payload = {
      ...formData,
      entranceTestDate: formData.entranceTestDate
        ? dateForInput(formData.entranceTestDate)
        : undefined,
    };

    return payload;
  };

  const handleSubmit = async () => {
    let payload = preparePayload();
    // alert(JSON.stringify(payload));
    // console.log(payload);
    // return;
    try {
      setIsSubmitting(true);
      let res = await entranceTestsApi.create(payload);
      await successCallback();
      showSuccess({ text: res.message, type: "noti-box" });
    } catch (error) {
      console.log(error);
      showError({ axiosResponse: error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <SubHeading title="Entrance Test Create Form" />
          <form>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
              <Input
                type="text"
                label="Title"
                placeholder="title"
                variant={variant}
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                labelPlacement="outside"
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
              <Input
                type="text"
                label="Description"
                placeholder="description"
                variant={variant}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                labelPlacement="outside"
              />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-3">
              <Input
                type="date"
                label="EntranceTestDate"
                placeholder="entranceTestDate"
                variant={variant}
                value={formData.entranceTestDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    entranceTestDate: e.target.value,
                  }))
                }
                labelPlacement="outside"
              />
            </div>

            <div className="flex justify-center gap-5 mt-8">
              <CustomButton
                color="primary"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                title="Create"
              />
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default EntranceTestCreateForm;
