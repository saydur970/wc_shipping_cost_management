"use client";
import { useState, useEffect, useRef, FC } from 'react';
import classes from '../styles/dropdown.module.css';
// import { Icon_Arrow_Down } from '../icons/arrow_down';


interface IComp {
  currentValue: string | null;
  setCurrentValue: (item: string, idx: number) => void;
  list: string[];
  label: string;
  disabled?: boolean;
}

export const Dropdown: FC<IComp> = ({ list, label, currentValue, setCurrentValue, disabled}) => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const bodyClick = (e: MouseEvent) => {

      const target: any = e.target;

      if (
        target && dropdownRef?.current &&
        dropdownRef.current.contains(target)
      ) {
        return;
      }

      setIsOpen(false);

    }

    document.body.addEventListener('click', bodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', bodyClick);
    }

  }, []);


  const clickHanlder = () => {

    if(disabled) {
      setIsOpen(false);
      return null;
    }

    setIsOpen(!isOpen)

  }


  const optionRender = () => {
    return list.map((item, idx) => (
      <div
        onClick={() => setCurrentValue(item, idx)}
        key={item}
        className={classes.option_item}
      >
        {item}
      </div>
    ))
  }


  return (
    <div ref={dropdownRef} 
      className={classes.root}
      // className={disabled ? [classes.root, classes.disabled].join(' '): classes.root}
      onClick={clickHanlder}
    >

      <div
        className={disabled ? [classes.select_box_div, classes.boxDisabled].join(' '): classes.select_box_div}
      >

        <div className={classes.select_box}>
          <span 
            className={
              (isOpen || currentValue) ? 
              [classes.label_txt, classes.label_txt_upper].join(' ') :
              classes.label_txt
            }
            style={{ 
              ...(isOpen && { color: 'red' }),
              ...(disabled && { color: '#d1d1d1' })
            }}
          >
            {label}
          </span>

          <p 
            className={classes.label_selected}
            style={{...(!currentValue && { opacity: 0 })}}
          >
            {currentValue ? currentValue: label}
          </p>

          {/* <Icon_Arrow_Down scale={0.5} fill="#4b566b" /> */}

        </div>


      </div>


      {
        isOpen && (

          <div 
            className={classes.option_list}
            style={{zIndex: 99999}}
          >
            {optionRender()}
          </div>

        )
      }

    </div>
  )


};