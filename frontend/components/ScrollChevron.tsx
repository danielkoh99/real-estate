const ScrollChevron: React.FC<{
  containerRef: HTMLDivElement | null;
  scrollBy: number;
  direction: "left" | "right";
  children: React.ReactNode;
}> = ({ containerRef, scrollBy, direction, children }) => {
  const scroll = () => {
    if (!containerRef) return;
    containerRef.scrollBy({
      [direction]: scrollBy, // Adjust the scroll amount
      behavior: "smooth",
    });
  };

  return <button onClick={scroll}> {children} </button>;
};

export default ScrollChevron;
