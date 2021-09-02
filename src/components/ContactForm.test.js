import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';


test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, 'John')
    const firstNameError = screen.getByTestId('error');
    expect(firstNameError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const button = screen.getByRole('button');
    userEvent.click(button)
    const errors = screen.getAllByTestId('error')
    expect(errors).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i)
    const button = screen.getByRole('button');

    userEvent.type(firstNameInput, 'Joshua');
    userEvent.type(lastNameInput, 'Wolfenstein');
    userEvent.click(button);

    const error = screen.getByTestId('error');
    expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i)
    const emailInput = screen.getByLabelText(/email*/i);

    userEvent.type(firstNameInput, 'Joshua');
    userEvent.type(lastNameInput, 'Wolfenstein');
    userEvent.type(emailInput, 'laksjdflakj');


    const error = screen.getByTestId('error');
    expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const emailInput = screen.getByLabelText(/email*/i);
    const button = screen.getByRole('button');

    userEvent.type(firstNameInput, 'Joshua');
    userEvent.type(emailInput, 'example@gmail.com');
    userEvent.click(button);


    const error = screen.getByTestId('error');
    expect(error).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i)
    const emailInput = screen.getByLabelText(/email*/i);
    const messageInput = screen.getByLabelText(/message*/i);
    const button = screen.getByRole('button');

    userEvent.type(firstNameInput, 'Joshua');
    userEvent.type(lastNameInput, 'Wolfenstein');
    userEvent.type(emailInput, 'example@gmail.com');
    userEvent.click(button);

    const displayFirstName = screen.getByTestId('firstnameDisplay')
    const displayLastName = screen.getByTestId('lastnameDisplay')
    const displayEmail = screen.getByTestId('emailDisplay')
    const displayMessage = screen.queryByTestId('messageDisplay')
        
    expect(firstNameInput).toBeInTheDocument(displayFirstName);
    expect(lastNameInput).toBeInTheDocument(displayLastName);
    expect(emailInput).toBeInTheDocument(displayEmail);
    expect(messageInput).toBeInTheDocument(displayMessage);
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i)
    const emailInput = screen.getByLabelText(/email*/i);
    const messageInput = screen.getByLabelText(/message*/i);
    const button = screen.getByRole('button');

    userEvent.type(firstNameInput, 'Joshua');
    userEvent.type(lastNameInput, 'Wolfenstein');
    userEvent.type(emailInput, 'example@gmail.com');
    userEvent.type(messageInput, 'Hello World')
    userEvent.click(button);

    const displayFirstName = screen.getByTestId('firstnameDisplay')
    const displayLastName = screen.getByTestId('lastnameDisplay')
    const displayEmail = screen.getByTestId('emailDisplay')
    const displayMessage = screen.queryByTestId('messageDisplay')
        
    expect(firstNameInput).toBeInTheDocument(displayFirstName);
    expect(lastNameInput).toBeInTheDocument(displayLastName);
    expect(emailInput).toBeInTheDocument(displayEmail);
    expect(messageInput).toBeInTheDocument(displayMessage);
});