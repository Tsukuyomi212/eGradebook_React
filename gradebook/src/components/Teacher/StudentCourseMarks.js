import React, { Component } from "react";
import { TEACHER } from "../../services/api";
import AddMark from "./AddMark";
import UpdateMark from "./UpdateMark";
import { format, getYear, isWithinRange } from "date-fns";

class StudentCourseMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      schoolClassGrade: undefined,
      schoolClassSection: "",
      schoolYear: "",
      courseName: "",
      marks: [],
      teacherId: localStorage.getItem("id")
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token" === null)) {
      this.props.history.push("/");
    } else {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };

      const { studentId, courseId } = this.props.match.params;
      const URL =
        TEACHER +
        this.state.teacherId +
        "/student/" +
        studentId +
        "/course/" +
        courseId;

      fetch(URL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                firstName: data.student.firstName,
                lastName: data.student.lastName,
                schoolClassGrade: data.student.schoolClass.grade,
                schoolClassSection: data.student.schoolClass.section,
                schoolYear: data.student.schoolClass.schoolYear,
                courseName: data.course.subject.name,
                marks: data.marks,
                studentId: data.student.id,
                addMarkVisible: false
              })
            );
          } else {
            response.text().then(message => alert("Something went wrong..."));
          }
        })
        .catch(error => console.log(error));
    }
  }

  addMark = marks => {
    this.setState({ marks });
  };

  updateMark = index => mark => {
    const { marks } = this.state;
    marks[index] = mark;
    marks[index].canUpdate = false;
    this.setState({ marks });
  };

  enableMarkUpdate = index => () => {
    const { marks } = this.state;
    marks[index].canUpdate = true;
    this.setState({ marks });
  };

  disableMarkUpdate = index => () => {
    const { marks } = this.state;
    marks[index].canUpdate = false;
    this.setState({ marks });
  };

  deleteMark = id => {
    const path = TEACHER + this.state.teacherId + "/mark/" + id;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          this.setState({
            marks: this.state.marks.filter(mark => mark.id !== id)
          });
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const categories = ["Semester", "Mark", "Date added"];
    const { courseId } = this.props.match.params;
    return (
      <div>
        <h5>
          {this.state.schoolClassGrade} / {this.state.schoolClassSection} (
          {this.state.schoolYear})
        </h5>
        <h5>
          Student: {this.state.firstName} {this.state.lastName}
        </h5>
        <h5>Course: {this.state.courseName}</h5>
        <p>
          Add new mark:
          <AddMark
            onAddMark={this.addMark}
            teacherId={this.state.teacherId}
            courseId={courseId}
            studentId={this.state.studentId}
          />
        </p>
        <h5>Student's marks form course:</h5>
        <table>
          <thead>
            <tr>
              {categories.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.marks.map((mark, index) => {
              const markDate = new Date(mark.dateAdded);
              return (
                <tr key={mark.id}>
                  <td>{getSemester(markDate)}</td>
                  <td>{mark.value}</td>
                  <td>{format(markDate, "MMMM Do YYYY")}</td>
                  <td>
                    {mark.canUpdate ? (
                      <UpdateMark
                        teacherId={this.state.teacherId}
                        onUpdateMark={this.updateMark(index)}
                        markId={mark.id}
                        onCancel={this.disableMarkUpdate(index)}
                      />
                    ) : (
                      <button onClick={this.enableMarkUpdate(index)}>
                        Update
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => this.deleteMark(mark.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function getSemester(date) {
  const year = getYear(date);
  const firstSemesterStart = new Date(year, 8, 1);
  const firstSemesterEnd = new Date(year, 11, 31);
  return isWithinRange(date, firstSemesterStart, firstSemesterEnd) ? "I" : "II";
}

export default StudentCourseMarks;

//onClick={() => this.props.history.push(`/teacher/${this.state.teacherId}/student/${this.state.student.id}/course/${courseId}/addmark`)}
