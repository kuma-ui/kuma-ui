import { Context } from 'sonik'

export default function AboutName(c: Context) {
  const name = c.req.param('name')
  return c.render(<h2>It's {name}!</h2>, {
    title: `About ${name}`,
  })
}
