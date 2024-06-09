import { CSSProperties, FC, ReactNode } from 'react';

// if children is provided, then path will be ignored.
// so if children is provide, then set path = ''
interface IComp {
  // children: ReactNode;
  path: string;
  clsName?: string;
  Sx?: CSSProperties;
  fill?: string;
  dimension?: number;
  viewBox?: string;
  without_viewBox?: boolean;
  scale?: number;
  children?: ReactNode
}

export const IconHOC: FC<IComp> = ({
  path, clsName, Sx, fill, dimension, viewBox, without_viewBox, scale,
  children
}) => {

  const customStyle: CSSProperties = {
    
    display: 'inline-block',
    ...(scale && {transform: `scale(${scale})`}),
    ...(Sx ? Sx : {})
  }

  const size = dimension ? dimension : 24;

  const renderComp = () => {

    if(children) return children;

    if(without_viewBox) {

      return (
        <svg
          fill={fill || '#000'}
          xmlns="http://www.w3.org/2000/svg"
          width={size} height={size}
          fillRule="evenodd" clipRule="evenodd"
        >
          <path d={path} />
        </svg>
      )

    }

    return (
      <svg
        fill={fill || '#000'}
        xmlns="http://www.w3.org/2000/svg"
        width={size} height={size}
        viewBox={viewBox || "0 0 24 24"}
      >
        <path d={path} />
      </svg>
    )

  }


  return (
    <span
      style={customStyle}
      className={clsName || ''}
    >

      {renderComp()}

    </span>

  )
};