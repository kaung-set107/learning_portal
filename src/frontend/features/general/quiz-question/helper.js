export const isInstruction = (data) => {
  if (data === "instruction") return true;
  return false;
};

export const isParagraph = (data) => {
  if (data === "paragraph") return true;
  return false;
};

export const isQuestions = (data) => {
  if (data === "questions") return true;
  return false;
};
