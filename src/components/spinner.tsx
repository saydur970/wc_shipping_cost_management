import { FC, ReactNode } from 'react';
import classes from '../styles/spinner.module.css';

interface IComp {
  children: ReactNode;
  isVisible: boolean;
  dimension?: string;
}

export const Spinner: FC<IComp> = ({ children, isVisible, dimension  }) => {

  return (
    <div className={classes.root} >

      {
        isVisible &&
        (
          <div className={classes.spinner_div}>
          
            <div className={classes.lds_ellipsis}
              style={{
                height: dimension || '8rem',
                width: dimension || '8rem'
              }}
            >

              <div></div><div></div><div></div><div></div>

            </div>

          </div>
        )
      }

      <div className={classes.content_div}>
        {children}
      </div>

    </div>
  )

};