import React from "react";

interface Props {
  id: string;
  title: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
  error: string | undefined;
}

const CustomInput: React.FC<Props> = ({
  id,
  title,
  onChangeHandler,
  value,
  error,
}) => {
  return (
    <div className="inputBox">
      <label htmlFor={id}>{title}:</label>
      <div>
        <input
          type="text"
          className="input"
          name={id}
          id={id}
          value={value}
          onChange={onChangeHandler}
        />
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default CustomInput;
