import React, { useState } from "react";

function App() {

  const [name, setName]=useState("");
  const [email, setEmail]= useState("");
  const [interests, setInterests]=useState({coding: false,design: false,marketing: false });
  const [submitted, setSubmitted]= useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setInterests((prev) => ({ ...prev, [name]: checked }));
    } else {
      if (name === 'name') setName(value);
      if (name === 'email') setEmail(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };


  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Your Name"
            aria-label="name"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Your Email"
            aria-label="email"
          />
          <div>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={interests.coding}
              onChange={handleChange}
            />
            Coding
          </label>  
            <label>
              <input
                type="checkbox"
                name="design"
                checked={interests.design}
                onChange={handleChange}
              />
              Design
            </label>
            <label>
              <input
                type="checkbox"
                name="marketing"
                checked={interests.marketing}
                onChange={handleChange}
              />
              Marketing
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div>
          <h2>Thank you, {name}, for signing up!</h2>
          <p>Your selected interests: {Object.keys(interests).filter((interest) => interests[interest]).join(', ')}</p>
        </div>
    </main>
  );
}

export default App;
