import React from 'react';
import './Contact.css';
import { ContactInfo } from '../components/ContactInfo';
import { Form, FormGroup, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Reviews } from '../components/Reviews';

function Contact() {
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        emailAddress: Yup.string().email('Invalid email address').required('Email Address is required'),
        phoneNumber: Yup.string().matches(/^[0-9]+$/, "Mobile number must contain only digits")
        .min(10, "Mobile number must be at least 10 digits")
        .max(10, "Mobile number can't be longer than 10 digits").required('Phone Number is required'),
        date: Yup.date().required('Date is required'),
        guestsNumber: Yup.number().required('Number of Guests is required').positive('Number of Guests must be a positive number'),
        comments: Yup.string()
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            date: '',
            guestsNumber: '',
            comments: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        }
    });

    return (
        <div className='contact-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>Contact</h1>
                </div>
            </header>

            <div className='container my-5'>
                <div className='row'>
                    <div className='col-lg-6 d-flex align-items-center justify-content-center'>
                        <ContactInfo />
                    </div>
                    <div className='col-lg-6 d-flex justify-content-center'>
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup className='row mb-3'>
                                <div className='col-md-6'>
                                    <Form.Label htmlFor='firstName'>First Name</Form.Label>
                                    <Form.Control type='text' id='firstName' {...formik.getFieldProps('firstName')} />
                                    {formik.touched.firstName && formik.errors.firstName ? <div className='text-danger'>{formik.errors.firstName}</div> : null}
                                </div>
                                <div className='col-md-6'>
                                    <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                                    <Form.Control type='text' id='lastName' {...formik.getFieldProps('lastName')} />
                                    {formik.touched.lastName && formik.errors.lastName ? <div className='text-danger'>{formik.errors.lastName}</div> : null}
                                </div>
                            </FormGroup>
                            <FormGroup className='row mb-3'>
                                <div className='col-md-6'>
                                    <Form.Label htmlFor='emailAddress'>Email Address</Form.Label>
                                    <Form.Control type='email' id='emailAddress' {...formik.getFieldProps('emailAddress')} />
                                    {formik.touched.emailAddress && formik.errors.emailAddress ? <div className='text-danger'>{formik.errors.emailAddress}</div> : null}
                                </div>
                                <div className='col-md-6'>
                                    <Form.Label htmlFor='phoneNumber'>Phone Number</Form.Label>
                                    <Form.Control type='tel' id='phoneNumber' {...formik.getFieldProps('phoneNumber')} />
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className='text-danger'>{formik.errors.phoneNumber}</div> : null}
                                </div>
                            </FormGroup>
                            <FormGroup className='row mb-3'>
                                <div className='col-md-6'>
                                    <Form.Label htmlFor='date'>Date</Form.Label>
                                    <Form.Control type='date' id='date' {...formik.getFieldProps('date')} />
                                    {formik.touched.date && formik.errors.date ? <div className='text-danger'>{formik.errors.date}</div> : null}
                                </div>
                                <div className='col-md-6'>
                                    <Form.Label htmlFor='guestsNumber'>Number Of Guests</Form.Label>
                                    <Form.Control type='number' id='guestsNumber' {...formik.getFieldProps('guestsNumber')} />
                                    {formik.touched.guestsNumber && formik.errors.guestsNumber ? <div className='text-danger'>{formik.errors.guestsNumber}</div> : null}
                                </div>
                            </FormGroup>
                            <FormGroup className='mb-4'>
                                <Form.Label htmlFor='comments'>Comments</Form.Label>
                                <Form.Control as='textarea' id='comments' {...formik.getFieldProps('comments')} />
                                {formik.touched.comments && formik.errors.comments ? <div className='text-danger'>{formik.errors.comments}</div> : null}
                            </FormGroup>

                            <Button type='submit' className='btn btn-success btn-lg'>Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>

            <div className='bg-dark text-light py-5'>
                <Reviews />
            </div>
        </div>
    )
}

export default Contact;
