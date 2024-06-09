import { useReducer, useState, useEffect } from 'react';
import { shippingFormReducer, shippingFormReducer_initial } from './formReducer';
import { Dropdown } from '../components/dropdown';
import { SnackBar } from '../components/snackbar';
import { Fetch } from '../functions/fetch';
import classes from '../styles/client/app.module.css';
import { Spinner } from '../components/spinner';
import { ty_status } from '../types/general';
import { ty_shippingAreaList } from '../types/shippingArea.type';
import { TextField } from '../components/text_field';


export const App = () => {

  const [state, dispatch] = useReducer(shippingFormReducer, shippingFormReducer_initial);
  const [shippingAreaList, setShippingAreaList] = useState<ty_shippingAreaList>([]);
  const [status, setSatus] = useState<ty_status | null>(null);
  const [showErr, setShowErr] = useState(false);


  useEffect(() => {

    // @ts-ignore
    const varList: any = php_var_list;

    if (!varList || !varList.site_url) return;

    const fetchList = async () => {
      try {

        setSatus('loading');

        const listRes = await Fetch<ty_shippingAreaList>({
          url: `${varList.site_url}/wp-json/shippingTable/getAll`
        });

        setShippingAreaList([...listRes]);

        setShowErr(false);

        setSatus('success');

      }
      catch (err) {

        setShowErr(true);

        setSatus('error');

      }
    }

    fetchList();


  }, []);


  useEffect(() => {

    // fetch shipping area data list
    const list = shippingAreaList.map(el => el.ps);
    dispatch({ type: 'availablePS', payload: list });

    // get cart weight
    const cartDivWeight = document.getElementById('SHBDHCST2_cart_clc_weight');
    const cartDivPrice = document.getElementById('SHBDHCST2_cart_clc_price');

    if (cartDivWeight && cartDivPrice) {

      const cartWeight = cartDivWeight.innerText.replace(/\s/g, "");
      const cartPrice = cartDivPrice.innerText.replace(/\s/g, "");

      const totalWeight = Number(cartWeight);

      const approximateWeight = totalWeight < 1 ? 1 : totalWeight;

      dispatch({ type: 'php_cart', payload: { 
        total: totalWeight, approximate: approximateWeight, price: Number(cartPrice)
      } });
    }

  }, [shippingAreaList]);
  

  // hanlde input value
  useEffect(() => {

    const inputAreaID = document.getElementById('inputShippingAreaId') as HTMLInputElement;
    const inputAddress = document.getElementById('inputShippingAddress') as HTMLInputElement;

    if (!inputAddress || !inputAreaID) return;

    inputAreaID.value = state.shippingAreaID;
    inputAddress.value = state.address;

    const totalPriceDiv = document.getElementById('shbdhcst2_total_calculated_price');
    
    if(totalPriceDiv && state.totalPrice) {
      totalPriceDiv.innerHTML = `
        <p class=${classes.clcPara}> Total Price + Shipping Cost: 
          <span class=${classes.bold} > ${Number(state.totalPrice) + state.cartPrice}€ </span>
        </p>
      `
    }

  }, [state]);


  const psChangeHanlder = (idx: number) => {

    const areaList = shippingAreaList[idx];

    dispatch({ type: 'policeStation', payload: areaList.ps });
    dispatch({ type: 'availableArea', payload: [...areaList.list] });

  }


  return (
    <Spinner isVisible={status === 'loading'} >
      <div className={classes.root}>


        <h3> Shipping Details </h3>

        <SnackBar
          type="error"
          isOpen={showErr}
          closeHandler={() => setShowErr(false)}
          message="Failed to get Shipping Area"
        />

        <div className={classes.itemContainer} >
          <Dropdown
            list={['Amsterdam']} currentValue={state.city} setCurrentValue={item => { }}
            label="Select City"
          />
        </div>


        <div className={classes.itemContainer}>
          <Dropdown
            list={state.availablePSList}
            currentValue={state.policeStation}
            setCurrentValue={(item, idx) => psChangeHanlder(idx)}
            label="Select Postal Code"
          />
        </div>


        <div className={classes.itemContainer}>
          <Dropdown
            list={state.availableAreaList.map(el => el.area)}
            currentValue={state.area}
            setCurrentValue={(item, idx) => dispatch({ type: 'area', payload: idx })}
            label="Select Street"
            disabled={state.availableAreaList.length === 0}
          />
        </div>


        <div className={classes.itemContainer} style={{ marginTop: '20px' }} >

          <TextField
            label="Pick Point Address"
            value={state.address}
            changeHandler={value => dispatch({ type: 'address', payload: value })}
          />

        </div>


        <div className={classes.itemContainer}>

          {
            state.totalWeight ? (
              <p className={classes.clcPara}>
                Total weight of your cart is <span className={classes.bold} > {state.totalWeight} KG </span>.
              </p>
            ): ''
          }

          {
            (state.totalWeight && state.totalWeight < 1) || !state.totalWeight ? (
              <p className={classes.clcPara}>
                Though minimum weight will be considered as
                <span className={classes.bold} > 1 kg </span>.
                So your approximate weight is
                <span className={classes.bold} > {state.approximateWeight} kg </span>.
              </p>
            ): ''
          }

          {
            state.area && state.cost && state.totalPrice && (
              <>

                <p className={classes.clcPara}> Shipping Cost in
                  <span className={classes.bold} > {state.area} </span> is
                  <span className={classes.bold} > {state.cost}€ </span>
                  per kg
                </p>

                <p className={classes.clcPara} style={{ marginTop: '20px', fontSize: '20px' }} >
                  Total Shipping Cost is
                  <span className={classes.bold} >
                    {state.totalPrice}€
                  </span>
                </p>

              </>
            )
          }

        </div>


      </div>
    </Spinner>
  )
};