import classes from "./SearchBar.module.css";

export default function SearchBar({ value, onChange, onClick }) {
  return (
    <div className={classes.wrapper}>
      <input
        type="text"
        placeholder="Enter folder name"
        value={value}
        onChange={onChange}
      />
      <button onClick={onClick}>
        <p>+ Create new folder</p>
      </button>
    </div>
  );
}
