import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marginTop: 2,
      marginLeft: 2,
      getIdTd: 0,
      getIdTr: 0,
      arrRows: new Array(App.defaultProps.defaultRows),
      arrCols: new Array(App.defaultProps.defaultCols),
      opacityRowsBtnHover: "visible",
      opacityColsBtnHover: "visible",
      timer: 0,
    };
  }

  addRow = () => {
    const { arrRows } = this.state;
    this.setState({
      arrRows: [...arrRows, ""],
    });
  };

  addCols = () => {
    const { arrCols } = this.state;
    this.setState({
      arrCols: [...arrCols, ""],
    });
  };

  removeRow = () => {
    const { arrRows, getIdTr, marginTop } = this.state;
    if (arrRows.length - 1 === getIdTr) {
      this.setState({
        getIdTr: getIdTr - 1,
      });
    }
    if (arrRows.length > 1) {
      let remRow = arrRows;
      remRow.splice(getIdTr, 1);
      this.setState({
        arrRows: remRow,
      });
      if (marginTop > arrRows.length * 42) {
        this.setState({
          marginTop: marginTop - 44,
        });
      }
    }
  };

  removeCol = () => {
    const { arrCols, getIdTd, marginLeft } = this.state;
    if (arrCols.length - 1 === getIdTd)
      this.setState({
        getIdTd: getIdTd - 1,
      });
    if (arrCols.length > 1) {
      let remColl = arrCols;
      remColl.splice(getIdTd, 1);
      this.setState({
        arrCols: remColl,
      });
      if (marginLeft > arrCols.length * 42) {
        this.setState({
          marginLeft: marginLeft - 44,
        });
      }
    }
  };

  changePosition = (event) => {
    if (event.target.nodeName === "TD") {
      this.setState({
        getIdTd: event.target.cellIndex,
        getIdTr: event.target.parentNode.rowIndex,
        marginTop: event.target.offsetTop,
        marginLeft: event.target.offsetLeft,
      });
    }
    if (this.state.arrCols.length === 1) {
      this.setState({
        opacityColsBtnHover: "hidden",
      });
    } else {
      this.setState({
        opacityColsBtnHover: "visible",
      });
    }
    if (this.state.arrRows.length === 1) {
      this.setState({
        opacityRowsBtnHover: "hidden",
      });
    } else {
      this.setState({
        opacityRowsBtnHover: "visible",
      });
    }
  };

  opacityRemoveBtnsInvis = () => {
    this.setState({
      timer: setTimeout(() => {
        this.setState({
          opacityRowsBtnHover: "hidden",
          opacityColsBtnHover: "hidden",
        });
      }, 2000),
    });
  };

  opacityRemoveBtnsVis = () => {
    this.setState({
      opacityRowsBtnHover: "visible",
      opacityColsBtnHover: "visible",
    });
    clearTimeout(this.state.timer);
  };

  render() {
    let {
      marginTop,
      marginLeft,
      arrCols,
      arrRows,
      opacityColsBtnHover,
      opacityRowsBtnHover,
    } = this.state;
    const drawCols = [...arrCols].map((item, index) => (
        <td key={index + 101}></td>
      )),
      drawRows = [...arrRows].map((item, index) => (
        <tr key={index + 201}>{drawCols}</tr>
      ));
    return (
      <>
        <div className="borderVisibleBtns">
          <div className="horizontalGroup">
            <div
              className="removeRow"
              style={{
                marginTop: `${marginTop + 42}px`,
                visibility: `${opacityRowsBtnHover}`,
              }}
              onClick={this.removeRow}
              onMouseOver={this.rowsOpacityOn}
              onMouseLeave={this.rowsOpacityOff}
            >
              -
            </div>
            <div className="verticalGroup">
              <div
                style={{
                  marginLeft: `${marginLeft}px`,
                  visibility: `${opacityColsBtnHover}`,
                }}
                className="removeColl"
                onClick={this.removeCol}
                onMouseOver={this.colsOpacityOn}
                onMouseLeave={this.colsOpacityOff}
              >
                -
              </div>
              <div
                className="mainTable"
                onMouseOver={this.opacityRemoveBtnsVis}
                onMouseLeave={this.opacityRemoveBtnsInvis}
              >
                <table onMouseMove={this.changePosition}>
                  <tbody>{drawRows}</tbody>
                </table>
              </div>
              <div className="addRows" onClick={this.addRow}>
                +
              </div>
            </div>
            <div className="addCols" onClick={this.addCols}>
              +
            </div>
          </div>
        </div>
      </>
    );
  }
}

App.defaultProps = {
  defaultCols: 4,
  defaultRows: 4,
};
export default App;
