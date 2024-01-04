import classes from "./Path.module.css";

export default function Path({ p, onClick }) {
  return (
    <>
      <span className={classes.path} onClick={() => onClick(p)}>
        /{p.name}
      </span>
    </>
  );
}
