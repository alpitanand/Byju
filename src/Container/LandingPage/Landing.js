import React from "react";
import Style from "./Landing.module.scss";
import JobImage from "./2663543.jpg";
import Select from "react-select";
import Axios from "axios";
import Jobs from "../../Component/Jobs/Jobs";
import ReactPaginate from "react-paginate";
import "./pagi.scss";

class LandingPage extends React.Component {
  state = {
    data: [],

    skills: [],
    location: [],
    experience: [],

    selectedSkill: "",
    selectedLocation: "",
    selectedexperience: "",

    onOnePage: [],
    jobsCountPerPage: 50,
    filterData: []
  };

  componentDidMount() {
    console.log("Alpit");
    Axios.get("https://nut-case.s3.amazonaws.com/jobs.json").then(res => {
      this.setState({ data: res.data.data }, () => {
        var sliced = this.state.data.slice(0, this.state.jobsCountPerPage);
        this.setState({ onOnePage: sliced });
        let {
          skillsList,
          locationList,
          experienceList
        } = this.state.data.reduce(
          (acc, { skills, location, experience }) => {
            acc.skillsList.add(skills);
            acc.locationList.add(location);
            acc.experienceList.add(experience);
            return acc;
          },
          {
            skillsList: new Set(),
            locationList: new Set(),
            experienceList: new Set()
          }
        );
        skillsList = [...skillsList].map(value => ({ value, label: value }));
        locationList = [...locationList].map(value => ({
          value,
          label: value
        }));
        experienceList = [...experienceList].map(value => ({
          value,
          label: value
        }));
        this.setState({
          skills: skillsList,
          location: locationList,
          experience: experienceList
        });
      });
    });
  }

  setSkill(e) {
    this.setState({ selectedSkill: e });
  }

  setLocation(e) {
    this.setState({ selectedLocation: e });
  }

  setExperience(e) {
    this.setState({ selectedexperience: e });
  }

  getParams() {
    var query = {
      skills: this.state.selectedSkill.value || "",
      location: this.state.selectedLocation.value || "",
      experience: this.state.selectedexperience.value || ""
    };

    function filterBy(list, criteria) {
      return list.filter(candidate =>
        Object.keys(criteria).every(key => {
          if (criteria[key] === "") {
            return true;
          }
          return candidate[key].indexOf(criteria[key]) > -1;
        })
      );
    }
    var filter = filterBy(this.state.data, query);
    this.setState({ filterData: filter });
  }

  handlePageClick(data) {
    var imf = this.state.jobsCountPerPage;

    var slicedData = this.state.data.slice(
      imf * data.selected,
      imf * data.selected + imf
    );
    this.setState({ onOnePage: slicedData });
  }
  reset() {
    this.setState({
      selectedSkill: "",
      selectedexperience: "",
      selectedLocation: "",
      filterData: []
    });
  }

  render() {
    var paginate = (
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={this.state.data.length / this.state.jobsCountPerPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={e => this.handlePageClick(e)}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    );
    if (this.state.filterData.length !== 0) {
      paginate = "";
    }

    var jobfound = this.state.data.length;
    if (this.state.filterData.length !== 0) {
      jobfound = this.state.filterData.length;
    }

    const locationStyles = {
      control: styles => ({
        ...styles,
       
        margin: "10px 0",
        borderRadius: 5
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isFocused ? "#CECDCB" : null,
          color: "Black",
          cursor: "default",
          ":active": {
            ...styles[":active"],
            backgroundColor: "CECDCB"
          }
        };
      }
    };

    const experienceStyle = {
      control: styles => ({
        ...styles,
       
        margin: "10px 0",
        borderRadius: 5
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isFocused ? "#CECDCB" : null,
          color: "Black",
          cursor: "default",
          ":active": {
            ...styles[":active"],
            backgroundColor: "CECDCB"
          }
        };
      }
    };

    const components = {
      DropdownIndicator: null
    };

    return (
      <>
        <div className={Style.bigHead}>
          <div className={Style.bigImage}>
            <img src={JobImage} alt="Job Image"></img>
          </div>
          <div className={Style.filters}>
            <span className={Style.numberOfJobs}>
              Total job found : <strong>{jobfound}</strong>
            </span>
            <Select
              name="location"
              options={this.state.location}
              className="basic-multi-select"
              classNamePrefix="select"
              styles={locationStyles}
              value={this.state.selectedLocation}
              onChange={e => this.setLocation(e)}
              placeholder="Select location"
            />
            <Select
              name="experience"
              options={this.state.experience}
              className="basic-multi-select"
              classNamePrefix="select"
              value={this.state.selectedexperience}
              styles={experienceStyle}
              onChange={e => this.setExperience(e)}
              placeholder="Select experience"
            />
            <Select
              name="skill"
              options={this.state.skills}
              className="basic-multi-select"
              classNamePrefix="select"
              value={this.state.selectedSkill}
              styles={experienceStyle}
              onChange={e => this.setSkill(e)}
              placeholder="Select skill"
            />

            <div className={Style.buttStyle}>
              <button onClick={() => this.getParams()}>
                <strong>Hire me</strong>
              </button>
              <button onClick={() => this.reset()}>Reset</button>
            </div>
          </div>
        </div>

        <hr />

        <Jobs data={this.state.onOnePage} filterData={this.state.filterData} />

        <div className={Style.pages}>{paginate}</div>
      </>
    );
  }
}

export default LandingPage;
