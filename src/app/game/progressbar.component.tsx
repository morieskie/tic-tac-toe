"use client";

const ProgressbarComponent = ({ progress = 0 }: { progress: number }) => {
  if (progress < 0 || progress > 100)
    throw Error('"progress" should be a valid number from 0 to 100');

  const categorizeValue = (value: number) => {
    const categories = [0, 10, 25, 50, 75, 100];
    let closest = categories[0];

    for (const category of categories) {
      if (Math.abs(value - category) < Math.abs(value - closest - 1)) {
        closest = category;
      }
    }
    return closest;
  };
  const rounded = categorizeValue(Math.floor(progress));
  console.log({ rounded, progress, cat: categorizeValue(progress) });

  return (
    <div className="progress" role="progressbar">
      <div className={`progress-bar w-${rounded}`}>{rounded}%</div>
    </div>
  );
};

export default ProgressbarComponent;
