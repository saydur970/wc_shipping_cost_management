import { useEffect, FC } from 'react';
import classes from '../styles/snackbar.module.css';
import { IconCrossBold } from './icons/cross_bold';

export type ty_snackbar_type = 'success'| 'warning'| 'error';

interface IComp {
  isOpen: boolean;
  closeHandler: () => void;
  type: ty_snackbar_type;
  message: string;
}

const DELAY_TIME = 4 * 1000; // 4s

export const SnackBar: FC<IComp> = ({ isOpen, message, type, closeHandler }) => {


  let clsList = [classes.root];

  if(type === 'success') {
    clsList.push(classes.success)
  }
  else if(type === 'error') {
    clsList.push(classes.error)
  }
  else {
    clsList.push(classes.warning)
  }

  useEffect(() => {

    let timer1 = setTimeout(() => {

      closeHandler();

    }, DELAY_TIME);

    return () => {
      clearTimeout(timer1);
    };

  }, [closeHandler]);


  if(!isOpen) return null;

  return (
    <div className={clsList.join(' ')}> 

      <p className={classes.message}>
        {message}
      </p>

      <button
        className={classes.icon_btn}
        onClick={closeHandler}
      >
        <IconCrossBold
          fill="#fff"
          Sx={{ transform: 'translateY(0.2rem) scale(0.4)', padding: '0rem' }}
        />
      </button>


    </div>
  )

};