import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("../services/blogs");
import App from "../App";

const user = {
  username: "tester",
  token: "1231231214",
  name: "Donald Tester"
};

describe("<App />", () => {
  test("blogs should not render if no user logged in", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("Login"));

    const button = component.container.querySelector(".submit-btn");
    expect(button).toBeDefined();

    const blogs = component.container.querySelectorAll(".blog-style");
    expect(blogs.length).toBe(0);
  });

  test("blogs should render when a user is logged in", async () => {
    localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() =>
      component.container.querySelector(".subtitle-login-info")
    );

    const blogs = component.container.querySelector(".blog-style");
    expect(blogs).toBeDefined();
    expect(blogs).toHaveTextContent("HTML is easy");
    expect(blogs).toHaveTextContent("Browser can execute only javascript");
  });
});
