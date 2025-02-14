import '../../../src/global.css'
import { redirect } from 'next/navigation';
import getSessionCookie from '../../../utilities/getSessionCookie';
import { fetchBeaconSpec, fetchNodeHealth, fetchSyncData } from '../../api/beacon'
import { fetchLogMetrics } from '../../api/logs';
import Wrapper from './Wrapper'

export default async function Page() {
  try {
    const token = getSessionCookie()

    const logMetrics = await fetchLogMetrics(token)
    const beaconSpec = await fetchBeaconSpec(token)
    const syncData = await fetchSyncData(token)
    const nodeHealth = await fetchNodeHealth(token)

    return <Wrapper initLogMetrics={logMetrics} initSyncData={syncData} beaconSpec={beaconSpec} initNodeHealth={nodeHealth} />
  } catch (e) {
    redirect('/error')
  }
}
