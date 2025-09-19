import { createFileRoute } from '@tanstack/react-router'
import PaymentPage from '../../../../../features/user/trains/components/PaymentPage'
export const Route = createFileRoute('/(user)/trains/$trainId/book/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><PaymentPage/></div>
}
