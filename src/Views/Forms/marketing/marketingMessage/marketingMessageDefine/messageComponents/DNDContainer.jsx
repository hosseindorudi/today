import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import BackDrop from "../../../../../../Components/backDrop/BackDrop";
import useAxios from "../../../../../../customHooks/useAxios";
import useRequest from "../../../../../../customHooks/useRequest";
import { questionReadTitle } from "../../../../../../services/questionService";
import { handleError } from "../../../../../../validation/functions";
import { DndItem } from "./DndItem";
import DndTextArea from "./DndTextArea";

const DNDContainer = ({ value, handleChange, dropped }) => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const request = useRequest();
  const [response, loading, fetchData, setResponse] = useAxios();

  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        response.Title.map((r) => {
          const newElement = {
            Id: r.Id,
            Value: r.Value,
            bValue: `{${r.Value}}`,
          };
          return setItems((oldArray) => [...oldArray, newElement]);
        });
        break;
      //   case "SUBMIT":
      //     handleSubmited();
      //     break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response, type)
        : handleError(response.Message);
    }
    setResponse(undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: questionReadTitle,
      headers: {
        accept: "*/*",
      },
      data: request,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {" "}
      {loading && <BackDrop open={true} />}
      <div className="dndContainer">
        <div className="items">
          <ListGroup>
            {items.map((i, index) => (
              <DndItem i={i} index={index} dropped={dropped} />
            ))}
          </ListGroup>
        </div>
        <DndTextArea value={value} handleChange={handleChange} />
      </div>
    </>
  );
};

export default DNDContainer;
