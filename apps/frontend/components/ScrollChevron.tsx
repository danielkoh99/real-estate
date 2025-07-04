import { twMerge } from "tailwind-merge";

const ScrollChevron: React.FC<{
  containerRef: HTMLDivElement | null;
  scrollBy: number;
  direction: "left" | "right";
  children: React.ReactNode;
  classes?: string;
}> = ({ containerRef, scrollBy, direction, children, classes }) => {
  const scroll = () => {
    if (!containerRef) return;
    const scrollOptions: ScrollToOptions = {
      behavior: "smooth",
    };

    if (direction === "right") {
      scrollOptions.left = scrollBy; // Horizontal scrolling
    } else if (direction === "left") {
      scrollOptions.left = -scrollBy; // Horizontal scrolling in the opposite direction
    } else if (direction === "down") {
      scrollOptions.top = scrollBy; // Vertical scrolling
    } else if (direction === "up") {
      scrollOptions.top = -scrollBy; // Vertical scrolling in the opposite direction
    }
    containerRef.scrollBy(scrollOptions);
  };

  return (
    <button
      className={twMerge(
        "flex items-center justify-center p-2 bg-white rounded-full absolute  top-1/2 z-50 border border-slate-700",
        classes,
      )}
      onClick={scroll}
    >
      {children}
    </button>
  );
};

export default ScrollChevron;
