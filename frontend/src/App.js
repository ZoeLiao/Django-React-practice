import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

const TESTED = 0
const UNTESTED = -1


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTested: TESTED,
      wordList: [],
      modal: false,
	  activeItem: {
	  	title: "",
	  	description: "",
	  	completed: false
	  },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/words/")
      .then(res =>
          this.setState({ wordList: res.data },
          ()=>{console.log(this.state.wordList)})
      )
      .catch(err => console.log(err));
  };

  displayTested = status => {
    if (status) {
      return this.setState({ viewTested: true });
    }
    return this.setState({ viewTested: false });
  };

  toggle = () => {
      this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
	this.toggle();
	alert("save" + JSON.stringify(item));
  };

  handleDelete = item => {
  	alert("delete" + JSON.stringify(item));
  };

  createItem = () => {
  	const item = { title: "", description: "", completed: false };
  	this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
  	this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = status => {
  	if (status) {
  		return this.setState({ viewCompleted: true });
  	}
  	return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayTested(true)}
          className={this.state.viewTested ? "active" : ""}
        >
          Tested
        </span>
        <span
          onClick={() => this.displayTested(false)}
          className={this.state.viewTested ? "" : "active"}
        >
          Untested
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewTested } = this.state;
    const newItems = this.state.wordList.filter(
      item => item.test_status === viewTested
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`word-title mr-2 ${
            this.state.viewTested ? "tested-word" : ""
          }`}
          title={item.meaning}
        >
          {item.word}
        </span>
        <span>
          <button onClick={() => this.editItem(item)} className="btn btn-secondary mr-2"> Edit </button>
          <button onClick={() => this.handleDelete(item)} className="btn btn-danger">Delete </button>
        </span>
      </li>
    ));
  };
  render() {
    return (
      <main className="content">
        <h1 className="word-header text-white text-uppercase text-center my-4">Learn Words</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">Add vocabulary words</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>

		{this.state.modal ? (
			<Modal
			activeItem={this.state.activeItem}
			toggle={this.toggle}
			onSave={this.handleSubmit}
			/>
		) : null}

      </main>
    );
  }
}
export default App;
