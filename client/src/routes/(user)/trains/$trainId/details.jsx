import { createFileRoute } from '@tanstack/react-router'
import { TrainSearchbyNo } from '../../../../features/trains/components'

export const Route = createFileRoute('/(user)/trains/$trainId/details')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><TrainSearchbyNo/></div>
}
