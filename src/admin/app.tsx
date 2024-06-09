import { useState, useEffect } from 'react';
import { AddItem } from './addItem';
import { Fetch } from '../functions/fetch';
import { SnackBar, ty_snackbar_type } from '../components/snackbar';
import { Spinner } from '../components/spinner';
import classes from '../styles/admin/app.module.css';
import { ty_status } from '../types/general';
import { ty_shippingAreaList } from '../types/shippingArea.type';
import { AreaList } from './areaList';
import { Button } from '../components/button';

type T_snackTxt = {
  msg: string;
  status: ty_snackbar_type,
  visible: boolean;
}

export type ty_varList = { siteUrl: string; nonce: string };

export const App = () => {


  const [shippingAreaList, setShippingAreaList] = useState<ty_shippingAreaList>([]);
  const [status, setSatus] = useState<ty_status | null>(null);
  const [snackTxt, setSnackTxt] = useState<T_snackTxt>({ status: 'success', msg: '', visible: false });
  const [showAddItem, setShowAddItem] = useState(false);
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [varList, setVarList] = useState<ty_varList | null>(null);

  useEffect(() => {

    fetchAreaList();

  }, []);


  const fetchAreaList = async () => {

    try {

      // @ts-ignore
      const phpVarList: any = php_var_list;

      if (!phpVarList || !phpVarList.site_url || !phpVarList.nonce) {
        throw new Error('failed');
      }

      setVarList({
        siteUrl: phpVarList.site_url,
        nonce: phpVarList.nonce
      });

      setSatus('loading');

      const listRes = await Fetch<ty_shippingAreaList>({
        url: `${phpVarList.site_url}/wp-json/shippingTable/getAll`
      });

      setShippingAreaList([...listRes]);

      setSatus('success');

    }
    catch (err) {

      setSatus('error');

      setSnackTxt({ status: 'error', msg: 'Failed to get Shipping Area', visible: true });
    }

  }

  const addItemSuccess = () => {
    setSnackTxt({ status: 'success', msg: 'Shipping Area inserted', visible: true  });
    setShowAddItem(false);
    fetchAreaList();
  }

  const addItemFail = () => {
    setSnackTxt({ status: 'error', msg: 'Failed to insert Shipping Area', visible: true  });
    setShowAddItem(false);
  }

  const deleteItemSuccess = () => {
    setSnackTxt({ status: 'success', msg: 'Shipping item deleted', visible: true  });
    setShowDeleteItem(false);
    fetchAreaList();
  }

  const deleteItemFail = () => {
    setSnackTxt({ status: 'error', msg: 'Failed to delete shipping item', visible: true  });
  }


  return (
    <Spinner isVisible={status === 'loading'}>

      <SnackBar
        type={snackTxt.status}
        isOpen={snackTxt.visible}
        closeHandler={() => setSnackTxt({...snackTxt, visible: false })}
        message={snackTxt.msg}
      />

      <div className={classes.root} >

        <h1 className={classes.title} > Shipping Cost </h1>

        <div className={classes.actionBtnList} >
          <Button onClick={() => setShowAddItem(true)} > Add new item </Button>
          <Button onClick={() => setShowDeleteItem(prev => !prev)} >
            {
              showDeleteItem ?
              'Cancel Delete' :
              'Delete one item'
            }
            
          </Button>
        </div>

        {
          showAddItem && varList &&
          <AddItem
            setShowAddItem={setShowAddItem}
            varList={varList}
            successHandler={addItemSuccess}
            errorHandler={addItemFail}
          />
        }


        {
          varList &&
          <AreaList
            varList={varList}
            list={shippingAreaList}
            showDeleteItem={showDeleteItem}
            setSatus={setSatus}
            successHandler={deleteItemSuccess}
            errorHandler={deleteItemFail}
          />
        }

      </div>

    </Spinner>
  )

};