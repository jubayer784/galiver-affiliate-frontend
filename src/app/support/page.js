import UiIcon from '../../components/UiIcon';

export const metadata = { title: 'Support' };

const whatsappUrl = 'https://api.whatsapp.com/message/AVBOP5UOAJE6F1?autoload=1&app_absent=0';

export default function Support() {
  return <main className="support-page shell">
    <style>{`.support-page{max-width:900px;padding-bottom:120px}.support-hero{text-align:center;margin:20px auto 26px}.support-hero h1{margin:0;color:#17231d;font:700 30px Arial,sans-serif}.support-hero h1 span{color:#e35d38}.support-hero p{margin:10px auto 0;max-width:560px;color:#64716b;font:15px/1.6 Arial,sans-serif}.support-card{padding:24px;border:1px solid #dfe5dc;border-radius:8px;background:#fff;box-shadow:0 0 10px rgba(158,219,158,.45)}.support-actions{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.support-action{display:flex;align-items:center;justify-content:center;gap:9px;padding:15px 12px;border-radius:7px;background:#e35d38;color:#fff;font:700 15px Arial,sans-serif}.support-info{display:grid;gap:20px;margin-top:28px;padding-top:24px;border-top:1px solid #e5e8e3;text-align:center}.support-info-item>svg{color:#e35d38}.support-info-item strong{display:block;margin-top:6px;color:#17231d;font:600 16px/1.5 Arial,sans-serif}@media(max-width:600px){.support-card{padding:18px 14px}.support-actions{grid-template-columns:1fr}.support-hero h1{font-size:25px}.support-info-item strong{font-size:14px}}`}</style>
    <header className="support-hero"><h1><span>Support</span> Center</h1><p>Have questions? Contact our support team through WhatsApp or phone.</p></header>
    <section className="support-card">
      <div className="support-actions">
        <a className="support-action" href={whatsappUrl} target="_blank" rel="noreferrer"><UiIcon name="chat" size={21} />WhatsApp</a>
        <a className="support-action" href="tel:+8801829128381"><UiIcon name="phone" size={21} />Call Us</a>
      </div>
      <div className="support-info">
        <div className="support-info-item"><UiIcon name="phone" size={27} /><strong>+8801829128381</strong></div>
        <div className="support-info-item"><UiIcon name="location" size={27} /><strong>New Market City Complex, Level 3, Shop No 54, Dhaka</strong></div>
      </div>
    </section>
  </main>;
}
