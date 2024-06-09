import { FC, ReactNode } from 'react';
import classes from '../styles/button.module.css';
import { cls_join } from '../functions/cls_join';

interface IComp {
  children: ReactNode;
  onClick?: ()=> void;
  clsName?: string;
  disabled?: boolean;
}

export const Button: FC<IComp> = ({ 
  children, onClick, clsName, disabled
}) => {

  let clsList = [classes.root];


  if(clsName) clsList.push(clsName);

  if(disabled) clsList.push(classes.disabled);

  return (
    <button
      onClick={onClick}
      className={cls_join(clsList)}
      disabled={disabled}
    >
      {children}
    </button>
  )

};