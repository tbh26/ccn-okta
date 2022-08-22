// src/pages/home/HomePage.test.tsx
import React from "react";
import axios from "axios";
import { act, render, screen } from "@testing-library/react";

import HomePage from "./HomePage";

jest.mock("axios");

test("renders learn react link", async () => {
  (axios.get as any).mockImplementation(() =>
    Promise.resolve({
      data: {
        count: 2,
        rows: [makeFakePost(1, "Fake post #1"), makeFakePost(2, "Fake post #2")],
      },
    })
  );

  await act(async () => {
    render(<HomePage />);
  });
  const pageTitleEl = screen.getByText("Codaisseur Coders Network");
  expect(pageTitleEl).toBeInTheDocument();

  const postA = screen.getByText("Fake post #2", {
    selector: "h2",
  });
  expect(postA).toBeInTheDocument();

  const postB = screen.getByText("Fake post #2", {
    selector: "h2",
  });
  expect(postB).toBeInTheDocument();
});

export function makeFakePost(id: number, title: string) {
  return {
    id,
    title,
    content: "Bla bla bla",
    createdAt: "2020-10-06T14:05:05.976Z",
    updatedAt: "2020-10-06T14:05:06.258Z",
    author_id: 2,
    tags: [],
    post_likes: [],
  };
}

test("some failing test case", async function () {
  (axios.get as any).mockImplementation(() =>
    Promise.reject(new Error("Oops, request failed!"))
  );

  await act(async () => {
    render(<HomePage />);
  });
  const pageTitleEl = screen.getByText("Codaisseur Coders Network");
  expect(pageTitleEl).toBeInTheDocument();
  screen.debug();
  const fakeposts = screen.queryByText("Fake post");
  expect(fakeposts).toBeNull();
  // const pElement = screen.getAllByRole('paragraph');
  // expect(pElement).toContain('ERROR');
  expect(screen.getByText('ERROR!')).toBeInTheDocument();
});
