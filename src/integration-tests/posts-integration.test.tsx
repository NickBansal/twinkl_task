import { describe, it, expect, vi } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import App from "../App";
import axios from "axios";
import userEvent from "@testing-library/user-event";

const mockPosts = [
  { id: 1, title: "React Basics" },
  { id: 2, title: "Advanced React Patterns" },
];

vi.mock("axios");

describe("<App />", () => {
  it("should display data after loading has finished", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: mockPosts,
    });

    render(<App />);

    expect(screen.getByText("Loading posts...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText("Loading posts..."));
    expect(screen.getByText(/React Basics/i)).toBeInTheDocument();
    expect(screen.getByText(/Advanced React Patterns/i)).toBeInTheDocument();
  });

  it("should display error message when there was an issue with getting the data", async () => {
    vi.spyOn(axios, "get").mockRejectedValue(new Error("Network Error"));

    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading posts..."));
    expect(screen.getByText("There was an issue getting the data")).toBeInTheDocument();
  });

  it("should remove a post when the delete button is clicked", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: mockPosts,
    });
    vi.spyOn(axios, "delete").mockResolvedValue({});

    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading posts..."));

    const deleteButton1 = screen.getAllByRole("button", { name: /Remove/i })[0];
    await userEvent.click(deleteButton1);

    expect(axios.delete).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts/1");
    expect(screen.queryByText(/React Basics/i)).not.toBeInTheDocument();

    const deleteButton2 = screen.getByRole("button", { name: /Remove/i });
    await userEvent.click(deleteButton2);

    expect(axios.delete).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts/1");
    expect(screen.queryByText(/Advanced React Patterns/i)).not.toBeInTheDocument();
  });

  it("should filter posts based on search input", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({
      data: mockPosts,
    });

    render(<App />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading posts..."));

    const searchInput = screen.getByRole("searchbox");
    await userEvent.type(searchInput, "Basics");

    expect(screen.getByText(/React Basics/i)).toBeInTheDocument();
    expect(screen.queryByText(/Advanced React Patterns/i)).not.toBeInTheDocument();

    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, "Advanced");

    expect(screen.queryByText(/React Basics/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Advanced React Patterns/i)).toBeInTheDocument();
  });
});
