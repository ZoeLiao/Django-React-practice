import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import * as Constants from "./components/Const";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTested: Constants.UNTESTED,
      wordList: [],
      modal: false,
	  activeItem: {
	    word: "",
	    meaning: "",
	    test_status: -1
	  },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/words/")
      .then(res =>
          this.setState({ wordList: res.data },
          ()=>{console.log(this.state.wordList)})
      )
      .catch(err => console.log(err));
  };

  displayTested = status => {
    return this.setState({ viewTested: status });
  };

  toggle = () => {
      this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
	this.toggle();
    if (item.id) {
      axios
        .put(`/api/words/${item.id}/`, item)
        .then(res => this.refreshList());
        return;
    }
    axios
      .post("/api/words/", item)
      .then(res => this.refreshList());
  };

  handleDelete = item => {
    axios
      .delete(`/api/words/${item.id}`)
      .then(res => this.refreshList());
  };

  createItem = () => {
  	const item = { word: "", meaning: "", test_status: false };
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
          onClick={() => this.displayTested(Constants.REMEMBERED)}
          className={this.state.viewTested === Constants.REMEMBERED ? "active" : ""}
        >
          Remembered
        </span>
        <span
          onClick={() => this.displayTested(Constants.FAMILIAR)}
          className={this.state.viewTested === Constants.FAMILIAR ? "active" : ""}
        >
          Familiar
        </span>
        <span
          onClick={() => this.displayTested(Constants.UNTESTED)}
          className={this.state.viewTested === Constants.UNTESTED ? "active" : ""}
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
