import React, { Component } from "react";


const TESTED = 1
const UNTESTED = 0

const wordItems = [
  {
    id: 1,
    word: "Apple",
    meaning: "A red fruit",
    test_status: TESTED, 
  },
  {
	id: 2,
	word: "Banana",
	meaning: "A yellow fruit",
	test_status: UNTESTED, 
  },
  {
	id: 3,
	word: "Cat",
	meaning: "A kind of animal which sleep a lot, so that it is called neko in Japanese",
	test_status: UNTESTED, 
  },
];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTested: TESTED,
      wordList: wordItems
    };
  }
  displayTested = status => {
    if (status) {
      return this.setState({ viewTested: true });
    }
    return this.setState({ viewTested: false });
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
      item => item.test_status == viewTested
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
          <button className="btn btn-secondary mr-2"> Edit </button>
          <button className="btn btn-danger">Delete </button>
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
                <button className="btn btn-primary">Add vocabulary words</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default App;
