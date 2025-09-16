import { createFileRoute } from '@tanstack/react-router'
import { TrainDetail } from '../../../features/trains/components'

export const Route = createFileRoute('/(user)/trains/$trainId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><TrainDetail/></div>
}
