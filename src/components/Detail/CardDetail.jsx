import React from "react";

export function CardDetail({ dogDetail }) {
  return (
    <div className="detail-container">
      <div className="detail-card">
        <img src={dogDetail?.img} alt="" />
        <div>
          <h1>{dogDetail?.name}</h1>
          <h3>{dogDetail?.temperament}</h3>
          <h3>
            Height:{" "}
            {dogDetail.height?.metric
              ? dogDetail.height?.metric
              : dogDetail.height}
          </h3>
          <h3>
            Weight:{" "}
            {dogDetail.weight?.metric
              ? dogDetail.weight?.metric
              : dogDetail.weight}
          </h3>
          <h3>Life Span: {dogDetail?.age}</h3>
        </div>
      </div>
    </div>
  );
}
