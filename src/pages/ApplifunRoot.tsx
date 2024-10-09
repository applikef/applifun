import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_PATH, URL_PARAM_TO_SECONDARY_ENTRY } from "../utils/ConstantsUtil";

export const ApplifunRoot = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const isQuiz = queryParameters.get(URL_PARAM_TO_SECONDARY_ENTRY);
  const home: boolean = (isQuiz !== null);

  const navigate = useNavigate();

  useEffect(() => {
    if (home) {
      navigate(HOME_PAGE_PATH);
    }  
    else {
      navigate("/dayQuiz");
    }  
  }, [home, navigate])

return (
  <>
    עוד שנייה אנחנו שם...
  </>
)} 