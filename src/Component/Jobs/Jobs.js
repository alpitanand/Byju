import React from "react";
import Style from "./Jobs.module.scss";

class Jobs extends React.Component {
  state = {};

  render() {
    var jobs = "Still being loaded";
    var loadedData=[]
    if(this.props.filterData.length !== 0){
      loadedData=this.props.filterData
    }
    else if (this.props.data !== undefined){
      loadedData = this.props.data 
    }
   
    if (loadedData.length !== 0) {
      jobs = loadedData.map(imformation => {
        var location = imformation.location;
        var title = imformation.title;
        var companyname = imformation.companyname;
        var exp = imformation.experience

        if (imformation.location.length > 10) {
          location = location.slice(0, 10) + "...";
        }

        if (location.length === 0) {
          location = "No details";
        }
        if (title.length === 0) {
          title = "No details";
        }
        if (companyname.length === 0) {
          companyname = "No details";
        }
        if(exp.length === 0){
         exp = "No details"

        }

        return (
          <a href={imformation.applylink} target="_blank" rel="noopener noreferrer" className={Style.jobCard} key={imformation._id}>
            <div className={Style.imf}>
              <span>{exp}</span>
            </div>
            <div className={Style.title}>
              <strong>{title}</strong>
            </div>
            <div className={Style.imf}>
              <span>{companyname}</span>
              <span>{location}</span>
            </div>
          </a>
        
        );
      });
    }

    return <div className={Style.jobs}>{jobs}</div>;
  }
}

export default Jobs;
