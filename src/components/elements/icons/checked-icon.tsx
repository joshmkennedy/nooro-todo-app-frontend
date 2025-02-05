import CheckMark from "./checkmark-icon";

export default function CheckedIcon() {
  return (
    <span style={{ display: "grid", gridTemplate: "1fr/1fr", placeContent:'center' }}>
      <svg
        style={{ gridArea: "1/-1" }}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.98019 15.4262C12.0728 15.4262 15.3904 12.1085 15.3904 8.01594C15.3904 3.92338 12.0728 0.605698 7.98019 0.605698C3.88763 0.605698 0.569946 3.92338 0.569946 8.01594C0.569946 12.1085 3.88763 15.4262 7.98019 15.4262Z"
          fill="#5E60CE"
        />
      </svg>
      <span style={{ gridArea: "1/-1" }} className="w-[7.3] mx-auto flex">
        <CheckMark />
      </span>
    </span>
  );
}
