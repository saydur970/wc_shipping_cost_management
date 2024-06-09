import { useState, FC, Dispatch, SetStateAction } from 'react';
import classes from '../styles/admin/addItem.module.css';
import { TextField } from '../components/text_field';
import { Button } from '../components/button';
import { IconCrossBold } from '../components/icons/cross_bold';
import { Spinner } from '../components/spinner';
import { ty_varList } from './app';
import { Fetch } from '../functions/fetch';

const INTPUT_MARGIN = '35px';

interface IComp {
  setShowAddItem: Dispatch<SetStateAction<boolean>>;
  varList: ty_varList;
  successHandler: () => void;
  errorHandler: () => void;
}

export const AddItem: FC<IComp> = ({ setShowAddItem, varList, successHandler, errorHandler }) => {

  const [policeStation, setPoliceStation] = useState('');
  const [area, setArea] = useState('');
  const [cost, setCost] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addHanlder = async () => {
    try {

      if(!policeStation || !area || !cost) return null;

      setIsLoading(true);

      await Fetch({
        url: `${varList.siteUrl}/wp-json/shippingTable/addItem`,
        methodType: 'POST',
        header: {
          'X-WP-Nonce': varList.nonce
        },
        data: {
          policeStation,
          area,
          cost
        }
      });

      successHandler();
    }
    catch(err) {
      errorHandler();
    }
    finally {
      setIsLoading(false);
    }
  }

  return (

    <div className={classes.container}>

      <Button
        clsName={classes.crossBtn}
        onClick={() => setShowAddItem(false)}
      >
        <IconCrossBold fill='#fff' scale={0.8} />
      </Button>

      <div className={classes.root}>

        <Spinner isVisible={isLoading} >


          <TextField
            label="Postal Code"
            value={policeStation}
            changeHandler={value => setPoliceStation(value)}
          />

          <TextField
            label="Street"
            value={area}
            changeHandler={value => setArea(value)}
            Sx={{ marginTop: INTPUT_MARGIN }}
          />

          <TextField
            label="Shipping Cost"
            value={cost}
            changeHandler={value => setCost(value)}
            Sx={{ marginTop: INTPUT_MARGIN }}
            type="number"
          />

          <div style={{ marginTop: '30px' }} >
            <Button onClick={addHanlder}
              disabled={!policeStation || !area || !cost}
            >
              Add Area
            </Button>
          </div>

        </Spinner>

      </div>

    </div>
  )

};