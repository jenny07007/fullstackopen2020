import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "../components/Blog";
jest.mock("../services/blogs");

const blog = {
  title: "testing react app",
  author: "Mars",
  url: "https://test.com",
  likes: 3,
  user: { name: "hello" }
};

describe("blog list tests", () => {
  const mockHandler = jest.fn();
  const onHandleRemove = jest.fn();
  let component;

  beforeEach(
    () =>
      (component = render(
        <Blog
          blog={blog}
          onClick={mockHandler}
          onHandleLikes={mockHandler}
          onHandleRemove={onHandleRemove}
        />
      ))
  );
  // 5.13
  test("blogs should only render author and title by default", () => {
    const blogContent = component.container.querySelector(".blog-list-title");
    const div = component.container.querySelector(".blog-list-showStyle");

    expect(div).toHaveStyle("display: none");
    expect(blogContent).toHaveTextContent(blog.title);
    expect(blogContent).toHaveTextContent(blog.author);
    expect(blogContent).not.toHaveTextContent(blog.url);
    expect(blogContent).not.toHaveTextContent(blog.likes);
  });

  // 5.14
  test("blogs should render url and numbers of likes when clicking the togglable button", () => {
    const button = component.container.querySelector(".blog-list-toggle");
    const div = component.container.querySelector(".blog-list-showStyle");
    const url = component.container.querySelector(".url");
    const likes = component.container.querySelector(".likes");
    fireEvent.click(button);

    expect(div).not.toHaveStyle("display: none");
    expect(url).toHaveTextContent(blog.url);
    expect(likes).toHaveTextContent(blog.likes);
  });

  // 5.15
  test("event handler should receive the props twice when clicking the likes button two times", () => {
    const button = component.container.querySelector(".like-btn");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
