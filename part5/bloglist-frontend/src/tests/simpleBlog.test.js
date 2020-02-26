import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM, getByText } from "@testing-library/dom";
import SimpleBlog from "../components/SimpleBlog";

const blog = {
  title: "testing react app",
  author: "Mars",
  likes: 3
};
describe("simpleBlog", () => {
  const mockHandler = jest.fn();
  let component;

  beforeEach(
    () => (component = render(<SimpleBlog blog={blog} onClick={mockHandler} />))
  );

  test("should render title", () => {
    const title = component.container.querySelector(".title");
    expect(title).toHaveTextContent(blog.title);

    const div = component.container.querySelector(".blog-info");
    console.log(prettyDOM(div));
  });

  test("should render author", () => {
    const author = component.container.querySelector(".author");
    expect(author).toHaveTextContent(blog.author);
  });

  test("should render likes", () => {
    const likes = component.container.querySelector(".likes");
    expect(likes).toHaveTextContent(blog.likes);
  });

  test("should be clicked thrice on the like button", () => {
    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls.length).toBe(3);
  });
});
