import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input } from 'antd';
import Form from '../../components/uielements/form';
import Button from '../../components/uielements/button';
import Notification from '../../components/notification';
import pipeline1Action from "../../redux/pipeline1/actions";
const FormItem = Form.Item;


class NameForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.trimPara});
  }

  handleSubmit(event) {
    console.log(this.state.trimPara)
    alert('A name was submitted: ' + this.state.trimPara);
    event.preventDefault();
    pipeline1Action.editTrimpara(this.state.trimPara)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default NameForm;
