import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import HealthSvg from '../../assets/images/health.svg'
import { StatusColor } from '../../types'
import { Diagnostics } from '../../types/diagnostic'
import DiagnosticOverviewText from '../DiagnosticOverviewText/DiagnosticOverviewText'
import HealthDisclosure from '../Disclosures/HealthDisclosure'
import Status from '../Status/Status'
import Typography from '../Typography/Typography'

export interface HealthOverviewProps {
  nodeHealth: Diagnostics
  isSyncing: boolean
}

const HealthOverview: FC<HealthOverviewProps> = ({ nodeHealth, isSyncing }) => {
  const { t } = useTranslation()
  const { totalDiskFree, uptime, healthCondition, overallHealthStatus, ramStatus, cpuStatus } =
    nodeHealth

  const healthStatus = isSyncing ? overallHealthStatus.syncing : overallHealthStatus.synced
  const condition = isSyncing ? healthCondition.syncing : healthCondition.synced

  const isSufficientSpace = totalDiskFree > 240
  const isSufficientRam = ramStatus === StatusColor.SUCCESS
  const isSufficientCpu = cpuStatus === StatusColor.SUCCESS

  return (
    <div className='relative overflow-hidden mt-4 w-full md:h-64 flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between p-4 border border-dark200'>
      <div className='relative z-20 h-full flex flex-col space-y-4 md:space-y-0 justify-between'>
        <div className='space-y-3'>
          <Typography isBold family='font-archivo' type='text-caption1'>
            <Trans i18nKey='vcHealthCheck.diagnosticOverview'>
              <br />
            </Trans>{' '}
            —
          </Typography>
          <DiagnosticOverviewText
            status={isSufficientSpace ? 'text-success' : 'text-error'}
            text={t(`vcHealthCheck.${isSufficientSpace ? 'hasDiskSpace' : 'noDiskSpace'}`)}
          />
          <DiagnosticOverviewText
            status={isSufficientCpu ? 'text-success' : 'text-warning'}
            text={
              isSufficientCpu ? t('vcHealthCheck.hasCpuReq') : t('vcHealthCheck.cpuRecommendation')
            }
          />
          <DiagnosticOverviewText
            status={ramStatus === StatusColor.SUCCESS ? 'text-success' : 'text-error'}
            text={isSufficientRam ? t('vcHealthCheck.hasRam') : t('vcHealthCheck.checkLowRam')}
          />
        </div>
        <HealthDisclosure />
      </div>
      <div className='relative z-10 h-full flex flex-col space-y-4 md:space-y-0 justify-between'>
        <div className='flex space-x-12'>
          <div className='space-y-4'>
            <Typography>{t('uptime')}</Typography>
            <Typography color='text-dark400'>
              — <br />
              <Trans i18nKey='nodesSyncing'>
                <br />
              </Trans>
            </Typography>
          </div>
          <Typography type='text-subtitle2'>{uptime.beacon}</Typography>
        </div>
        <div className='self-stretch w-full flex items-center justify-between'>
          <Typography isBold type='text-tiny' color='text-primary' className='uppercase'>
            {t('vcHealthCheck.healthCondition', { status: t(condition.toLowerCase()) })}
          </Typography>
          <Status status={healthStatus} />
        </div>
      </div>
      <HealthSvg className='opacity-70 absolute right-2.5 bottom-0' />
    </div>
  )
}

export default HealthOverview
