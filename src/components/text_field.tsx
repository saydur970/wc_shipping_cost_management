import { useState, FC, HTMLInputTypeAttribute, CSSProperties } from 'react';
import classes from '../styles/text_field.module.css';
import { cls_join } from '../functions/cls_join';

interface IComp {
  label: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  changeHandler: (value: string) => void;
  Sx?: CSSProperties
}

export const TextField: FC<IComp> = ({
  label, value, changeHandler, type, Sx

}) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      className={classes.root}
      style={Sx? Sx: {} }
    >

      <div className={classes.container}>

        <label 
          className={
            value || isFocused ?
            cls_join([classes.label, classes.label_up]) :
            classes.label
          }
          onClick={() => setIsFocused(true)}
        >
          {label}
        </label>

        <input className={classes.input}
          type={type || 'text'} value={value}
          onChange={e => changeHandler(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

      </div>

    </div>
  )

};