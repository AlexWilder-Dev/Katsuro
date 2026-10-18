import { hoursRows, lunchMenuLabel } from '../data/katsuro'
import { useShift } from '../lib/shift'
import { StatusPill } from './StatusPill'

export function HoursTable({ withStatus = true }: { withStatus?: boolean }) {
  const { now } = useShift()
  return (
    <div className="hours">
      {withStatus && <StatusPill />}
      <table className="hours__table">
        <caption className="sr-only">Opening hours</caption>
        <tbody>
          {hoursRows.map((row) => {
            const today = row.dayNums.includes(now.day)
            return (
              <tr key={row.days} className={today ? 'is-today' : ''}>
                <th scope="row">
                  {row.days}
                  {today && <span className="hours__today">today</span>}
                </th>
                <td>
                  {row.times.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="hours__note">Lunch menu: {lunchMenuLabel}.</p>
    </div>
  )
}
