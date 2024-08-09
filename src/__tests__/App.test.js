import { render, screen , fireEvent  } from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
});


test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  
  expect(screen.getByLabelText(/coding/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/design/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/marketing/i)).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
    const codingCheckbox = screen.getByLabelText(/coding/i);

    fireEvent.click(codingCheckbox);
    expect(codingCheckbox).toBeChecked();

    fireEvent.click(codingCheckbox);
    expect(codingCheckbox).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  const nameInput = screen.getByPlaceholderText(/your name/i);
  const emailInput = screen.getByPlaceholderText(/your email/i);

  // Simulate user interactions
  fireEvent.change(nameInput, { target: { value: 'Emma' } });
  fireEvent.change(emailInput, { target: { value: 'emma@example.com' } });

  // Verify that the form inputs show the typed values
  expect(nameInput.value).toBe('Emma');
  expect(emailInput.value).toBe('emma@example.com');
});


test("checked status of checkboxes changes when user clicks them", () => {
  // your test code here
  render(<App />);

  const codingCheckbox = screen.getByLabelText(/coding/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  const marketingCheckbox = screen.getByLabelText(/marketing/i);

  fireEvent.click(codingCheckbox);
  expect(codingCheckbox).toBeChecked();

  fireEvent.click(designCheckbox);
  expect(designCheckbox).toBeChecked();

  fireEvent.click(marketingCheckbox);
  expect(marketingCheckbox).toBeChecked();

  fireEvent.click(codingCheckbox);
  expect(codingCheckbox).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  // your test code here
  render(<App />);

  const nameInput = screen.getByPlaceholderText(/your name/i);
  const emailInput = screen.getByPlaceholderText(/your email/i);
  const submitButton = screen.getByText(/sign up/i);


  fireEvent.change(nameInput, { target: { value: 'Emma' } });
  fireEvent.change(emailInput, { target: { value: 'emma@example.com' } });
  fireEvent.click(submitButton);

  expect(screen.getByText(/thank you, emma, for signing up/i)).toBeInTheDocument();
  expect(screen.getByText(/your selected interests:/i)).toBeInTheDocument();
});
