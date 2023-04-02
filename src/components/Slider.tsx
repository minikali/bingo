import styles from "@/styles/Slider.module.css";
import React, { useCallback } from "react";

interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: number) => void;
  value: number;
}

const Slider = ({ value, onChange }: SliderProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(Number.parseInt(event.target.value, 10)),
    [onChange]
  );

  const valueInSeconds = value / 1000;

  return (
    <label>
      Speed: {valueInSeconds} second(s)
      <input
        name="slider"
        className={styles.slider}
        type="range"
        min="1000"
        max="6000"
        value={value}
        step="500"
        onChange={handleChange}
      />
    </label>
  );
};

export default Slider;
