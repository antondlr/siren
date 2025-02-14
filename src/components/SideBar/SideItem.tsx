import Link from 'next/link'
import { FC, ReactElement } from 'react'
import addClassString from '../../../utilities/addClassString'
import { OptionalBoolean } from '../../types'
import DisabledTooltip from '../DisabledTooltip/DisabledTooltip'

export interface SideItemProps {
  children: ReactElement
  isActive?: boolean
  isDisabled?: OptionalBoolean
  className?: string
  href: string
}

const SideItem: FC<SideItemProps> = ({ children, isActive, className, href, isDisabled }) => {
  const renderContent = () => (
    <Link
      className={addClassString(
        'cursor-pointer flex items-center justify-center group relative h-6',
        [className, isActive ? 'text-primary' : 'hover:text-primary text-dark400'],
      )}
      href={href}
    >
      <li>
        <div
          className={addClassString(
            'absolute bg-gradient-to-b from-primary to-secondary left-0 top-0 w-1 h-full',
            [!isActive && 'group-hover:block hidden'],
          )}
        />
        <div className='w-4 h-4 @1600:w-5 @1600:h-5'>{children}</div>
      </li>
    </Link>
  )
  return isDisabled ? (
    <DisabledTooltip place='right'>{renderContent()}</DisabledTooltip>
  ) : (
    renderContent()
  )
}

export default SideItem
