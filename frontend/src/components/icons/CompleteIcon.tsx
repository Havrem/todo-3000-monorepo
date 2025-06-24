export const CompleteIcon = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="1"
      width={width}
      height={height}
      fill="#74EC65"
      stroke="#000000"
    >
      <path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
};
