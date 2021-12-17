import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import MrtgDisplayGraph from "./MrtgComponents/MrtgDisplayGraph";
import api from "./service/api";

const Home = () => {
  const [listOfDax, setListOfDax] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [daxFileNames, setDaxFileNames] = useState([]);
  const [daxFiles, setDaxFiles] = useState([]);

  useEffect(() => {
    getListOfDax();
  }, []);

  useEffect(() => {
    createDaxFilename();
  }, [listOfDax]);

  const getListOfDax = async () => {
    setIsLoading(true);
    await api.dax.daxIp().then((res) => {
      // console.log(res.data);
      setListOfDax(res.data);
      // console.log(Object.keys(res.data));
    });
    setIsLoading(false);
  };

  const createDaxFilename = () => {
    var daxFiles = [];
    var objectDate = {};
    if (listOfDax.length !== 0) {
      listOfDax.map((dax) => {
        objectDate.day = `${dax.ipAddress}_Prepaid-day.png`;
        objectDate.week = `${dax.ipAddress}_Prepaid-week.png`;
        objectDate.month = `${dax.ipAddress}_Prepaid-month.png`;
        objectDate.year = `${dax.ipAddress}_Prepaid-year.png`;
        daxFiles[dax.name] = objectDate;
      });
      setDaxFileNames(daxFiles);
      console.log(daxFiles);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <br /> <br /> <br /> <br />
      {/* <section className="container"> */}
      {/* <div className="card bg-light mb-3"> */}
      {/* <div className="card-header">
          <center>asdasd</center>
        </div>
        <div className="card-body">
          <div className="mrtgDiv">
            <img src={sampleImage} />
          </div>
        </div> */}
      <MrtgDisplayGraph listOfDax={listOfDax} daxFiles={daxFiles} />
      {/* </div> */}
    </Fragment>
  );
};

export default Home;
