import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'
import LightHouseFullLogo from '../../assets/images/lightHouseFull.svg'
import SlasherLogo from '../../assets/images/slasher.svg'
import { isSideBarOpen } from '../../recoil/atoms'
import { SyncData } from '../../types/beacon'
import BeaconNetwork from '../BeaconNetwork/BeaconNetwork'
import Button, { ButtonFace } from '../Button/Button'
import Typography from '../Typography/Typography'
import Wallet from '../Wallet/Wallet'
import BeaconMetric from './BeaconMetric'
import ValidatorMetric from './ValidatorMetric'

export interface TopBarProps {
  syncData: SyncData
}

const TopBar: FC<TopBarProps> = ({ syncData }) => {
  const { t } = useTranslation()
  const toggleSideBar = useSetRecoilState(isSideBarOpen)
  const { beaconSync, executionSync } = syncData
  const openSideBar = () => toggleSideBar(true)

  return (
    <div className='w-full lg:h-14 @1540:h-18 border-b bg-white dark:bg-dark750 border-borderLight dark:border-dark800 flex justify-between'>
      <div className='flex h-full'>
        <div className='flex items-center md:w-42 border-r border-borderLight dark:border-borderDark px-4'>
          <div
            onClick={openSideBar}
            className='w-full h-full flex md:hidden items-center justify-center cursor-pointer'
          >
            <i className='bi-list text-dark900 dark:text-dark300 text-2xl' />
          </div>
          <LightHouseFullLogo className='hidden w-full md:flex text-black dark:text-white' />
        </div>
        <ValidatorMetric data={executionSync} />
        <BeaconMetric data={beaconSync} />
        <div className='hidden w-24 border-r border-borderLight dark:border-dark800 p-2'>
          <div className='flex-1 space-y-2'>
            <Typography family='font-roboto' type='text-tiny'>
              {t('slasher')}
            </Typography>
            <Typography
              color='text-primary'
              darkMode='dark:text-white'
              isBold
              type='text-caption1'
              family='font-roboto'
            >
              {t('live')}
            </Typography>
          </div>
          <SlasherLogo className='w-6 h-6 text-primary' />
        </div>
        <BeaconNetwork />
      </div>
      <div className='h-full flex'>
        <div className='h-full flex opacity-20'>
          <Wallet className='hidden lg:flex' borderStyle='border-l' />
          <Button
            className='hidden md:block items-center border-l border-borderLight dark:border-borderDark'
            type={ButtonFace.ICON}
          >
            <i className='bi bi-clock-history text-2xl text-dark300' />
          </Button>
          <Button
            className='hidden md:block items-center border-l border-borderLight dark:border-borderDark'
            type={ButtonFace.ICON}
          >
            <i className='bi bi-bell-fill text-2xl text-dark300' />
          </Button>
        </div>
        {/* <div className='h-full w-8 bg-gradient-to-b from-primary to-secondary flex items-center justify-center cursor-pointer'> */}
        {/*   <i className='bi bi-three-dots-vertical text-white text-3xl' /> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default TopBar
