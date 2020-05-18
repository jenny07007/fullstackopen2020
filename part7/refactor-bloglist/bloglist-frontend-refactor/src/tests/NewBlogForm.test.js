import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  fireEvent,
  getByLabelText,
  screen
} from "@testing-library/react";
import BlogForm from "../components/BlogForm";
jest.mock("../services/blogs");

const blog = {
  title: "testing react app",
  author: "Mars",
  url: "https://test.com",
  likes: 3,
  user: { name: "hello" }
};

// 5.16
describe("new blog form tests", () => {
  const onAddNewBlog = jest.fn();
  const onNewblogChange = jest.fn();
  let component = render(
    <BlogForm
      newBlog={blog}
      onAddNewBlog={onAddNewBlog}
      onNewblogChange={onNewblogChange}
    />
  );
  test("should receive correct info from the new blog form when a new blog is called ", () => {
    const form = component.container.querySelector("form");
    const titleInput = screen.getByLabelText(/title/i);
    const authorInput = screen.getByLabelText(/author/i);
    const urlInput = screen.getByLabelText(/url/i);

    fireEvent.change(titleInput, { target: { value: blog.title } });
    fireEvent.change(authorInput, { target: { value: blog.author } });
    fireEvent.change(urlInput, { target: { value: blog.url } });

    fireEvent.submit(form);

    expect(onAddNewBlog.mock.calls.length).toBe(1);
    expect(titleInput.value).toBe("testing react app");
    expect(authorInput.value).toBe("Mars");
    expect(urlInput.value).toBe("https://test.com");
  });
});
