import React from 'react';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
  }
  renderAction() {
    return isRemoval ? (
      <button className="Track-action">-</button>
    ) : (
      <button className="Track-action">+</button>
    );
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{/* <!-- track name will go here --> */}</h3>
          <p>
            {/* <!-- track artist will go here--><!-- track album will go here --> */}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
