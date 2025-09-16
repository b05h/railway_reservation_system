import { createFileRoute } from '@tanstack/react-router'
import { TrainBookNew } from '../../../../../features/user/trains/components'
export const Route = createFileRoute('/(user)/trains/$trainId/book/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><TrainBookNew/></div>
}
