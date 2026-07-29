import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

type ContactInfo = {
  headline: string;
  body: string;
  address: string;
  phone: string;
  email: string;
  officeHours: string;
};

export default async function ContactPage() {
  const contact = await getContent<ContactInfo>("contact.info");

  return (
    <>
      <PageHeader title={contact.headline} description={contact.body} />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4 rounded-2xl bg-stone-100 p-6">
            <InfoRow icon={<MapPin className="h-5 w-5" />} label="Address" value={contact.address} />
            <InfoRow icon={<Phone className="h-5 w-5" />} label="Phone" value={contact.phone} />
            <InfoRow icon={<Mail className="h-5 w-5" />} label="Email" value={contact.email} />
            <InfoRow icon={<Clock className="h-5 w-5" />} label="Office hours" value={contact.officeHours} />
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500 text-white">
        {icon}
      </div>
      <div>
        <p className="text-sm text-indigo-900/60">{label}</p>
        <p className="font-semibold text-indigo-950">{value}</p>
      </div>
    </div>
  );
}
