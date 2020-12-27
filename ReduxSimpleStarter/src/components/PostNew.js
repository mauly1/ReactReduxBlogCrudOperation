import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {createPost} from "../actions";

class PostNew extends React.Component {
    renderField(field) {

        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}: </label>
                <input className="form-control" type='text'  {...field.input}  />
                <div className="text-help">
                    {touched ? error : ''}
                </div>

            </div>
        );
    }

    onSubmit(values) {
        console.log('on submit values ', values);
        this.props.createPost(values, () => {
            this.props.history.push('/')
        });

    }

//    onChange={event => this.onInputChange(event.target.value)}
//<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
    render() {
        const {handleSubmit} = this.props;
        return (

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Title" name="title" component={this.renderField}/>
                <Field label="Categories" name="categories" component={this.renderField}/>
                <Field label="Content" name="content" component={this.renderField}/>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/"> Cancel </Link>
            </form>
        );
    }
}

function validate(values) {

    const errors = {};
    if (!values.title || values.title.length < 3) {
        errors.title = 'Please enter a title that is a least 3 characters !!'
    }
    if (!values.categories) {
        errors.categories = 'Please enter a categories !!'
    }
    if (!values.content) {
        errors.content = 'Please enter a content !!'
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostForm'  // a unique identifier for this form
})
(
    connect(null, {createPost})(PostNew)
)
