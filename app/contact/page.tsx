import ContactForm from "@/components/contact-form"
import SectionReveal from "@/components/section-reveal"

export default function ContactPage() {
  return (
    <main className="min-h-[100dvh] bg-[#0b0f17] text-white">
      <section className="container mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-start">
        <SectionReveal>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Get in touch</h1>
            <p className="mt-3 text-zinc-300">Questions, sponsorships, or volunteer? Drop us a message.</p>
            <div className="mt-6 rounded-xl border border-white/10 bg-[#0a0f16] p-6">
              <ContactForm />
            </div>
          </div>
        </SectionReveal>
        <SectionReveal>
          <div>
            <h2 className="text-xl font-semibold">Visit us</h2>
            <p className="mt-2 text-zinc-300">Cyber Arena, Campus Main Block</p>
            <div className="mt-4 aspect-video overflow-hidden rounded-lg border border-white/10">
              <iframe
                title="College Map"
                src="https://www.google.com/maps?q=Your%20College&output=embed"
                className="w-full h-full"
              />
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Map shows a generic location. Replace with your campus address.
            </p>
          </div>
        </SectionReveal>
      </section>
    </main>
  )
}
