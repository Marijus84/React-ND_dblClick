import React from 'react';
import { setHearted } from '../actions';
import {connect} from "react-redux";
import {addLogsList} from "../thunks";

class Card extends React.Component {
  constructor() {
      super();

    this.state = {
      opened: false,
    };
  }

  render() {
    const {
      backgroundImage,
      title,
      releaseDate,
      score,
      votes,
      description,
        onLogs,
      onSetHearted,
      id
    } = this.props;
    const { opened } = this.state;

    return (
      <div className="card">
        <div
          className="card__image"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />

        <div className="card__title">{title}</div>
        <div className="card__like" onClick={() => {onSetHearted(id);
            this.props.heartedList.includes(id) ? onLogs(`Nuimta širdelė filmui ${title}`) : onLogs(`Uždėta širdelė filmui ${title}`);
        }}>
          <i className= { this.props.heartedList.includes(id) ? 'fa fa-heart' : ' fa fa-heart-o'} />
        </div>

        <div className="card__subtitle">
          <span>{releaseDate}</span>
          <span>
            {score} ({votes} votes)
          </span>
        </div>

        <div className="card-info">
          <div className="card-info__header" onClick={() => this.setState({ opened: !opened })}>
            Summary
          </div>

          {opened ? <div className="card-info__description">{description}</div> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    heartedList: state.movies.heartedList,
    logs:state.movies.logs
});

const mapDispatchToProps = (dispatch) => ({
    onSetHearted: (id) => dispatch(setHearted(id)),
    onLogs: (data) => dispatch(addLogsList(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Card);
