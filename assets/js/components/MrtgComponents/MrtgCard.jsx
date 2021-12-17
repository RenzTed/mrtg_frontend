import React from "react";
import AccordionCard from "../AccordionCard";

function assembleBody(
  isLoading,
  subscriberMrtgResults,
  handleCreateGraph,
  subscriberInfoVal,
  imageDay,
  imageWeek,
  imageMonth
) {
  return (
    <div>
      <button onClick={handleCreateGraph} className="btn btn-secondary">
        {isLoading ? "Loading ..." : "View MRTG"}
      </button>

      <div className="mt-5 mrtgDiv">
        <center>
          {imageDay && <img className="mt-3" src={imageDay} />}
          {imageWeek && <img className="mt-3" src={imageWeek} />}
          {imageMonth && <img className="mt-3" src={imageMonth} />}
        </center>
      </div>
    </div>
  );
}

function MrtgCard(props) {
  const {
    isLoading,
    subcriberMrtgResults,
    handleCreateGraph,
    subscriberInfoVal,
    imageDay,
    imageWeek,
    imageMonth,
  } = props;

  return (
    <AccordionCard
      headerText="Utilization Graphs"
      bodyContent={assembleBody(
        isLoading,
        subcriberMrtgResults,
        handleCreateGraph,
        subscriberInfoVal,
        imageDay,
        imageWeek,
        imageMonth
      )}
    />
  );
}

export default MrtgCard;
