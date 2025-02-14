import Image from 'next/image'
import { FC, useMemo } from 'react'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const identicon = require('svg-identicon')

export interface IdenticonIconProps {
  type: 'CIRCULAR' | 'POLYGONAL' | 'SQUARE'
  hash: string
  size: number
}

const IdenticonIcon: FC<IdenticonIconProps> = ({ type, hash, size }) => {
  const sizePx = `${size}px`
  return useMemo(() => {
    return (
      <div
        className='bg-dark50 dark:bg-borderDark rounded-full'
        style={{ height: sizePx, width: sizePx }}
      >
        <Image
          width={size}
          height={size}
          className='rounded-full'
          alt='identicon'
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            identicon({
              type,
              hash,
              width: size,
              segments: 10,
              symmetricAxisAngle: 119,
            }),
          )}`}
        />
      </div>
    )
  }, [type, hash, size, sizePx])
}

export default IdenticonIcon
