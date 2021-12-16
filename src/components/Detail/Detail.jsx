import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDogById } from "../../actions";
import { useParams } from "react-router";

import "./detail.css";
import { CardDetail } from "./CardDetail";
import gifImage from "../../img/gifdog.gif";
import { Link } from "react-router-dom";

export function Detail() {
  const dispatch = useDispatch();
  const dogDetail = useSelector((state) => state.dogDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogById(id));
  }, [dispatch, id]);

  return dogDetail ? (
    <div className="container">
      <Link to="/home">
        <div className="btn">Back to the main page</div>
      </Link>
      <CardDetail dogDetail={dogDetail} />
    </div>
  ) : (
    <div>
      <h3>Loading...</h3>
      <img className="loader" src={gifImage} alt="" />
    </div>
  );
}
