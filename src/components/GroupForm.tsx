import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { contact } from '../data/katsuro'

/**
 * Dojo takes online bookings for 1 to 8. Bigger groups write in.
 * Demo only: nothing is sent; the form shows its confirmation state.
 */
export function GroupForm() {
  const [sent, setSent] = useState<null | { name: string; size: string; date: string }>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setSent({ name: String(f.get('name') || ''), size: String(f.get('size') || ''), date: String(f.get('date') || '') })
  }

  return (
    <div className="group-form">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="done" className="group-form__done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status">
            <p className="group-form__done-title">Got it{sent.name ? `, ${sent.name.split(' ')[0]}` : ''}.</p>
            <p>
              A table for {sent.size || 'your group'}
              {sent.date ? ` on ${new Date(sent.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}` : ''}.
              On the live site this goes straight to the team.
            </p>
            <p className="fine">
              This is a preview, so nothing was sent. For now, email <a href={`mailto:${contact.email}`}>{contact.email}</a> or call{' '}
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>.
            </p>
            <button type="button" className="text-link" onClick={() => setSent(null)}>
              Start again
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="field-row">
              <label>
                <span>Name</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                <span>Phone or email</span>
                <input name="contact" autoComplete="email" required />
              </label>
            </div>
            <div className="field-row">
              <label>
                <span>How many</span>
                <input name="size" type="number" min={9} max={50} inputMode="numeric" placeholder="9 or more" required />
              </label>
              <label>
                <span>Date</span>
                <input name="date" type="date" required />
              </label>
            </div>
            <label>
              <span>Anything we should know</span>
              <textarea name="notes" rows={3} />
            </label>
            <button type="submit" className="btn btn--primary">
              Send enquiry
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
