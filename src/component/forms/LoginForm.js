import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import Validator from 'validator'
import InlineError from '../messages/InlineError'
import PropsTypes from 'prop-types';

export default class LoginForm extends Component {

    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    }

    onChange= e =>
    this.setState({
        data:{...this.state.data,[e.target.name]:e.target.value}
    });


    onSubmit = () =>{
        const errors = this.validate(this.state.data);
        this.setState({errors});

        if(Object.keys(errors).length === 0)
        {
            this.props.submit(this.state.data);
        }
    };

    validate = (data) =>{
        const errors ={};
        if(!Validator.isEmail(data.email)) errors.email="Invalid Email";
        if(!data.password) errors.password = "can't be blank";

        return errors;
    }

    render() {

        const {data} = this.state;

        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field error={!!this.state.errors.email}>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email address"
                            value={data.email}
                            onChange={this.onChange}
                            />
                            {this.state.errors.email && <InlineError text={this.state.errors.email} />}
                    </Form.Field>
                    <Form.Field error={!!this.state.errors.password}>
                        <label htmlFor="password">
                            password
                        </label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            value={data.password}
                            onChange={this.onChange}
                            />
                            {this.state.errors.password &&<InlineError text={this.state.errors.password}/>}
                    </Form.Field>

                    <Button primary>Click Click</Button>
                </Form>
            </div>
        )
    }
}

LoginForm.PropsTypes={
    submit:PropsTypes.func.isRequired
}
