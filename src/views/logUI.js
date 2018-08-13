import React from 'react';
import * as logServices from '../services/logServices';

class LogUI extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('compound did mount is called', this.props);
    this.getProjectLogs('jptProject');
  }

  getProjectLogs = async projectName => {
    this.props.setLogFetchBegin();
    const res = await logServices.fetchRelatedLogs(projectName).then(data => {
      console.log(data, '++++++++++');
      return data.data.data;
    });
    console.log(res);
  };

  render() {
    return <div> hello from space </div>;
  }
}
export default LogUI;
