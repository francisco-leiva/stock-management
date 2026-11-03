import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/sales')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sales"!</div>
}
