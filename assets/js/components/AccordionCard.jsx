import React from "react";

function AccordionCard(props) {
  const { headerText, bodyContent } = props;

  return (
    <div className="card bg-light mb-3">
      <div className="card-header">{headerText}</div>
      <div className="card-body">{bodyContent}</div>
    </div>
  );
}

export default AccordionCard;
