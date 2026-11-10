import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GeoIntro } from "@/components/site/GeoIntro";
import { HeritageStory } from "@/components/site/HeritageStory";

describe("the editorial journey", () => {
  it("keeps the geographic journey without visible skip or numbered steps", () => {
    const { container } = render(<GeoIntro />);
    expect(screen.getByText("NAMIBIA")).toBeTruthy();
    expect(screen.getByText("WINDHOEK")).toBeTruthy();
    expect(container.querySelector(".gvc-geo-progress")).toBeTruthy();
    expect(screen.queryByText(/skip intro|skip journey/i)).toBeNull();
  });

  it("falls back through two real Earth image sources before the atmospheric sphere", () => {
    const { container } = render(<GeoIntro />);
    const earth = () => container.querySelector(".gvc-geo-earth img") as HTMLImageElement | null;
    expect(earth()?.src).toContain("svs.gsfc.nasa.gov");
    if (earth()) fireEvent.error(earth()!);
    expect(earth()?.src).toContain("upload.wikimedia.org");
    if (earth()) fireEvent.error(earth()!);
    expect(container.querySelector(".gvc-geo-planet-fallback")).toBeTruthy();
  });

  it("uses historical dates, not generic chapter numbering", () => {
    const { container } = render(<HeritageStory />);
    expect(screen.getByText("1971")).toBeTruthy();
    expect(screen.getByText("1973")).toBeTruthy();
    expect(container.textContent).not.toMatch(/0[1-9]\s*\/\s*0[1-9]/);
  });
});
