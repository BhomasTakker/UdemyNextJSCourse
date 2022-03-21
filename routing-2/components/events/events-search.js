import Button from "../ui/Button";
import classes from "./events-search.module.css";
import { useRef } from "react";

const EventSearch = (props) => {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const submitHandler = (evt) => {
    evt.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    props.onSearch(selectedYear, selectedMonth);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select ref={yearInputRef} id="year">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select ref={monthInputRef} id="month">
            <option value="1">January</option>
            <option value="5">May</option>
            <option value="4">April</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button type="submit">Find Events</Button>
    </form>
  );
};

export default EventSearch;
