import React from "react";

export default function LearningProgress() {
  return (
    <div className='flex gap-4 py-12'>
      <div className='flex flex-col gap-4'>
        <div>
          <div
            style={{
              borderRadius: "20px",
              width: "180px",
              height: "180px",
              flexShrink: "0",
            }}
            className='bg-slate-200'
          >
            <div>
              <h1
                style={{
                  width: "84px",
                  height: "44px",
                  color: "black",
                  fontWeight: "bolder",
                  padding: "30px 71px 106px 25px",
                }}
              >
                Course Complete
              </h1>
            </div>
            <div className='flex justify-between'>
              <div
                style={{
                  backgroundColor: "#369FFF",
                  marginLeft: "20px",
                  borderRadius: "20px",
                  width: "4px",
                  height: "30px",
                }}
              ></div>
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: "700px",
                  width: "51px",
                  height: "55px",

                  color: "#006ED3",
                }}
              >
                02
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
