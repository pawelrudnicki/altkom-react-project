import React from "react";
import {Button, Form} from "react-bootstrap";
import {compose} from "redux";
import {withFormik} from "formik";

function validate(values) {
    const errors = {};
    if (!values.address) errors.address = "Required.";
    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(values.address)) {
        errors.address = "Wrong address.";
    }
    return errors;
}

function submit(values, {props}) {
    props.changeAddress(values.address);
    const obj = {
        address: values.address,
        cords: props.currentCords,
    };
    props.informations.forEach((item) => obj[item.name] = item.value);
    sessionStorage.setItem(`${new Date().getTime()}`, JSON.stringify(obj));
}

class SearchBox extends React.Component {

    render() {
        const {values, handleChange, handleBlur, touched, errors, handleSubmit} = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Label>
                    Search location:
                </Form.Label>
                <div className="d-flex">
                    <Form.Control
                        name={"address"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        type={"text"}
                        placeholder={"Please provide IP address"}
                    />
                    <Button variant={"primary"} type={"submit"}>
                        Submit
                    </Button>
                </div>
                {
                    errors.address && touched.address &&
                    <Form.Text className="text-danger">
                        {errors.address}
                    </Form.Text>
                }
            </Form>
        );
    }
}

export default compose(
    withFormik({
        mapPropsToValues: () => ({
            address: ""
        }),
        validate,
        handleSubmit: submit
    })
)(SearchBox);

