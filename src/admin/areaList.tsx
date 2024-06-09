import { FC, Dispatch, SetStateAction } from 'react';
import classes from '../styles/admin/areaList.module.css';
import { ty_shippingAreaList, ty_shippingAreaList_item } from '../types/shippingArea.type';
import { IconCrossBold } from '../components/icons/cross_bold';
import { Button } from '../components/button';
import { ty_status } from '../types/general';
import { Fetch } from '../functions/fetch';
import { ty_varList } from './app';


interface IComp {
  list: ty_shippingAreaList;
  showDeleteItem: boolean;
  setSatus: Dispatch<SetStateAction<ty_status | null>>;
  varList: ty_varList;
  successHandler: () => void;
  errorHandler: () => void;
}

interface T_list_item extends ty_shippingAreaList_item {
  district: string;
  policeStation: string;
}

export const AreaList: FC<IComp> = ({ list, showDeleteItem, setSatus, varList, successHandler, errorHandler }) => {


  const deleteHandler = async (itemID: number) => {
    try {

      setSatus('loading');

      await Fetch({
        url: `${varList.siteUrl}/wp-json/shippingTable/deleteItem?id=${itemID}`,
        methodType: 'DELETE',
        header: {
          'X-WP-Nonce': varList.nonce
        }
      });

      setSatus('success');

      successHandler();
      
    }
    catch(err) {
      setSatus('error');
      errorHandler();
    }
  }


  const formatData = () => {

    let data: T_list_item[] = [];

    list.forEach(psList => {
      psList.list.forEach(item => {

        data = [
          ...data,
          {
            ...item,
            policeStation: psList.ps,
            district: 'Amsterdam'
          }
        ]
      }

      )
    });

    return data;

  }

  return (
    <div className={classes.root}>

      <table className={classes.table}>

        <tr className={classes.row}>
          <th className={classes.th}> City </th>
          <th className={classes.th}> Postal Code </th>
          <th className={classes.th}> Street </th>
          <th className={classes.th}> Cost </th>
          {
            showDeleteItem &&
            <th className={classes.th}> Delete </th>
          }
        </tr>

        {
          formatData().map(el => (
            <tr className={classes.row} key={el.id} >
              <td className={classes.td}> {el.district} </td>
              <td className={classes.td}> {el.policeStation} </td>
              <td className={classes.td}> {el.area} </td>
              <td className={classes.td}> {el.cost} </td>
              {
                showDeleteItem &&
                <td className={classes.td}>
                  <Button clsName={classes.crossBtn}
                    onClick={() => deleteHandler(el.id)}
                  >
                    <IconCrossBold scale={0.5} />
                  </Button>
                </td>
              }
            </tr>
          ))
        }

      </table>

    </div>
  )

};