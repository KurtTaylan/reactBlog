import React, { Component, PropTypes } from "react";
import { reduxForm } from "redux-form";
import "bootstrap/dist/css/bootstrap.css";
import { createPost } from "./../actions/index";
import { Link } from "react-router";
import _ from "lodash";

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for posts'
  },
  categories: {
    type: 'input',
    label: 'Enter some categories'
  },
  content: {
    type: 'textarea',
    label: 'Enter some content'
  }
};

const domOnlyProps = ({
  initialValue,
  autofill,
  onUpdate,
  valid,
  invalid,
  dirty,
  pristine,
  active,
  touched,
  visited,
  autofilled,
  ...domProps
}) => domProps;


class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
          this.context.router.push('/');
        }
      )
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''} `}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type className="form-control" type="text" {...domOnlyProps(fieldHelper)} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );

  }

  render() {
    const {fields: {title, categories, content}, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post</h3>

        {_.map(FIELDS, this.renderField.bind(this))}


        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" activeClassName="btn btn-danger">Cancel</Link>

      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate
}, null, {createPost})(PostsNew);
