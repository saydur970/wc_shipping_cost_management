import { FC } from 'react';
import { ty_comp_icon } from '../../types/component';
import { IconHOC } from './hoc';


export const IconCrossBold: FC<ty_comp_icon> = (props) => {

  return (
    <IconHOC
      {...props}
      path="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
    />
  )
};