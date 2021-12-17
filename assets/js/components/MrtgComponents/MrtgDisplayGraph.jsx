import React, { Fragment, useState, useEffect } from "react";
import { getImageFile } from "../service/api";
import api from "../service/api";
import Axios from "axios";

const MrtgDisplayGraph = ({ listOfDax, daxFiles }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [displayImages, setDisplayImages] = useState([]);

  useEffect(() => {
    handleCreateGraph();
  }, []);

  const handleCreateGraph = async () => {
    setIsLoading(true);
    await api.mrtg.createGraph().then((res) => {
      var dataResults = res.data;
      var daxDataNames = Object.keys(dataResults);
      // var fileNameObj = {};
      daxDataNames.map((nameKey) => {
        if (!dataResults[nameKey].hasOwnProperty("error")) {
          getImageFile(dataResults[nameKey].day).then((res) => {
            var day = { filePath: res, locationName: nameKey };

            setDisplayImages([...displayImages, day]);
            setDisplayImages((prevState) => [...prevState, day]);
          });
        }
      });
    });
  };

  const images = displayImages.map((test, key) => {
    return (
      <div key={key}>
        <div className="card bg-light mb-3">
          <div className="card-header">
            <center>{test.locationName}</center>
          </div>
          <div className="card-body">
            <div className="mrtgDiv">
              <img src={test.filePath} />
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div>{images}</div>;
};

export default MrtgDisplayGraph;
