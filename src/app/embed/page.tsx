import type { Metadata } from 'next';
import SpeedCameraAuditCalc from '@/components/calculators/SpeedCameraAuditCalc';
import EmbedCodeBox from '@/components/EmbedCodeBox';

export const metadata: Metadata = {
  title: 'Embed Free Ticket & Insurance Widget',
  description:
    'Embed TicketFig’s free 51-state speeding ticket 3-year insurance surcharge & 2027 speed camera calculator on driving school and auto blogs.',
  alternates: { canonical: '/embed/' }
};

export default function TicketEmbedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
          FREE EMBEDDABLE WIDGET · TICKETFIG.COM
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1120]">
          Free 2027 Traffic Ticket &amp; Insurance Calculator Widget
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          100% client-side and free to embed on driving school resources, motorist forums, and auto insurance guides.
        </p>
      </div>

      <SpeedCameraAuditCalc />

      <EmbedCodeBox
        siteName="TicketFig.com"
        siteUrl="https://ticketfig.com/"
        embedUrl="https://ticketfig.com/embed/"
        accentClass="bg-amber-500 hover:bg-amber-400 text-zinc-950"
      />
    </div>
  );
}
