import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChannels } from "../../actions/channelActions";
import Spinner from "../common/Spinner";
import Moment from "react-moment";
import axios from "axios";

class Channels extends Component {
  componentDidMount() {
    axios.get("http://84.32.134.181:5000/admin/channel").then(res => {
      const channels = res.data;
      this.setState({ channels });
    });
  }
  render() {
    const { user } = this.props.auth;
    const { channels, loading } = this.props.channels;

    let channelsContent;
    if (channels === null || loading) {
      channelsContent = <Spinner />;
    } else {
      if (Object.keys(channels).length > 0) {
        channelsContent = (
          <tbody>
            {channels.map((channel, index) => {
              const {
                id,
                title,
                logo_url,
                genre,
                url_name,
                url_file,
                create_time,
                update_time
              } = channel; //destructuring
              return (
                <tr key={index}>
                  <th scope="row">{id}</th>
                  <td>
                    <img
                      src={logo_url}
                      style={{ width: "25px", height: "25px" }}
                    />
                  </td>
                  <td>{title}</td>
                  <td>{genre}</td>
                  <td>{url_name}</td>
                  <td>{url_file}</td>
                  <td>
                    <Moment format="YYYY-MM-DD">{create_time}</Moment>
                  </td>
                  <td>
                    <Moment format="YYYY-MM-DD">{update_time}</Moment>
                  </td>
                </tr>
              );
            })}
          </tbody>
        );
      } else {
        channelsContent = (
          <div>
            <p className="lead text-muted">Channels not Found</p>
            <Link to="/create-channel" className="btn btn-lg btn-info">
              Create Channel
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="channels">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">Channel List</h1>
              <table className="table table-borderless">
                <thead>
                  <th>ID</th>
                  <th></th>
                  <th>TITLE</th>
                  <th>GENRE</th>
                  <th>URL CODE</th>
                  <th>URL FILE</th>
                  <th>CREATED</th>
                  <th>UPDATED</th>
                </thead>
                {channelsContent}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Channels.propTypes = {
  getChannels: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  channels: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  channels: state.channels,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getChannels }
)(Channels);
