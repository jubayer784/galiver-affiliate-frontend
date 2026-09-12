'use client';

import { useState } from 'react';
import UiIcon from './UiIcon';

const whatsappUrl = 'https://api.whatsapp.com/message/AVBOP5UOAJE6F1?autoload=1&app_absent=0';

// A "Support" trigger that opens the contact info directly as a popup,
// instead of navigating to the /support page — used on the landing page so
// a visitor never leaves it just to find a phone number.
export default function SupportPopup({ className, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      {open && (
        <div
          className="support-popup-backdrop"
          role="presentation"
          onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}
        >
          <style>{`.support-popup-backdrop{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:18px;background:rgba(23,35,29,.5)}.support-popup{width:min(100%,380px);padding:24px;border-radius:12px;background:#fff;box-shadow:0 12px 35px rgba(0,0,0,.22)}.support-popup-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}.support-popup-header h2{margin:0;color:#17231d;font:700 19px Arial,sans-serif}.support-popup-close{border:0;background:transparent;color:#94a09a;font-size:24px;line-height:1;cursor:pointer;padding:0}.support-popup-actions{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.support-popup .support-action{display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 10px;border-radius:7px;background:#e35d38;color:#fff;font:700 14px Arial,sans-serif}.support-popup-info{display:grid;gap:12px;margin-top:20px;padding-top:18px;border-top:1px solid #e5e8e3;text-align:center}.support-popup-info-item{display:grid;gap:5px;justify-items:center;color:#17231d;font:600 13px/1.5 Arial,sans-serif}.support-popup-info-item svg{color:#e35d38}`}</style>
          <section className="support-popup" role="dialog" aria-modal="true" aria-labelledby="support-popup-title">
            <div className="support-popup-header">
              <h2 id="support-popup-title">Support</h2>
              <button type="button" className="support-popup-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="support-popup-actions">
              <a className="support-action" href={whatsappUrl} target="_blank" rel="noreferrer">
                <UiIcon name="chat" size={18} />WhatsApp
              </a>
              <a className="support-action" href="tel:+8801829128381">
                <UiIcon name="phone" size={18} />Call Us
              </a>
            </div>
            <div className="support-popup-info">
              <div className="support-popup-info-item"><UiIcon name="phone" size={20} />+8801829128381</div>
              <div className="support-popup-info-item"><UiIcon name="location" size={20} />New Market City Complex, Level 3, Shop No 54, Dhaka</div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
