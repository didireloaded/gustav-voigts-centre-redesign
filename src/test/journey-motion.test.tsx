import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeritageStory } from "@/components/site/HeritageStory";

describe("the photographic heritage story", () => {
  it("uses historical dates, not generic chapter numbering", () => {
    const { container } = render(<HeritageStory />);
    expect(screen.getByText("1971")).toBeTruthy();
    expect(screen.getByText("1973")).toBeTruthy();
    expect(container.textContent).not.toMatch(/0[1-9]\s*\/\s*0[1-9]/);
  });
});
