export const metadata = {
  title: 'Terms and Conditions',
  description: 'Galiver অ্যাফিলিয়েট প্রোগ্রামের নিয়ম ও শর্তাবলী — কমিশন হার, রেফারেল লিংক, পেমেন্ট এবং অ্যাকাউন্ট সংক্রান্ত নীতিমালা।',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    icon: '✓',
    title: 'অ্যাফিলিয়েট যোগ্যতা',
    body: 'Galiver অ্যাফিলিয়েট প্রোগ্রামে যোগ দেওয়া সম্পূর্ণ ফ্রি। সাইনআপের পর অ্যাডমিন অনুমোদন করলেই আপনি লগইন করে প্রোডাক্ট প্রোমোট শুরু করতে পারবেন। ভুল বা মিথ্যা তথ্য দিয়ে রেজিস্ট্রেশন করলে আবেদন বাতিল হতে পারে।',
  },
  {
    icon: '৳',
    title: 'কমিশন হার ও যোগ্যতা',
    body: 'প্রোডাক্ট ও চলমান ক্যাম্পেইনের উপর নির্ভর করে প্রতিটি সফল অর্ডারে ডেলিভারি চার্জ বাদে প্রোডাক্ট ভ্যালুর উপর ৩০% পর্যন্ত কমিশন পাবেন। অর্ডারটি "Delivered" হিসেবে কনফার্ম হওয়ার পরই কমিশন আপনার wallet-এ যোগ হয় — অর্ডার প্লেস হওয়ার সাথে সাথে নয়।',
  },
  {
    icon: '↗',
    title: 'রেফারেল লিংক ও কুকি নীতি',
    body: 'আপনার রেফারেল লিংকে ক্লিক করলে একটি ট্র্যাকিং কুকি সেট হয় যা ৩০ দিন পর্যন্ত সক্রিয় থাকে। এই সময়ের মধ্যে কাস্টমার অর্ডার করলে সেটি আপনার নামে গণনা হবে, যদি না তার আগে অন্য কোনো নতুন ভ্যালিড রেফারেল লিংক সেটি প্রতিস্থাপন করে।',
  },
  {
    icon: '✕',
    title: 'অযোগ্য অর্ডার',
    body: 'বাতিল (cancelled), রিটার্ন হওয়া, প্রতারণামূলক (fraudulent), অথবা নিজের জন্য নিজে রেফার করা (self-referred) অর্ডারের জন্য কোনো কমিশন প্রযোজ্য নয়।',
  },
  {
    icon: '⇅',
    title: 'পেমেন্ট ও উত্তোলন',
    body: 'আপনার wallet balance থেকে পুরো ব্যালেন্স একসাথে পেমেন্ট রিকোয়েস্ট করতে পারবেন। প্রতিটি রিকোয়েস্টের একটি আলাদা Payment ID দেওয়া হয়, যা দিয়ে ড্যাশবোর্ডে পেমেন্টের অবস্থা (pending/paid/rejected) ট্র্যাক করতে পারবেন। রিকোয়েস্ট Reject হলে পুরো টাকা আবার আপনার wallet-এ ফেরত যোগ হবে।',
  },
  {
    icon: '!',
    title: 'অ্যাকাউন্ট সাসপেনশন',
    body: 'রেফারেল লিংকের অপব্যবহার, ভুয়া অর্ডার তৈরি করা, অথবা প্রোগ্রামের নিয়ম লঙ্ঘন করলে Galiver যেকোনো সময় অ্যাফিলিয়েট অ্যাকাউন্ট পর্যালোচনা বা সাময়িকভাবে স্থগিত (suspend) করার অধিকার রাখে। সাসপেন্ড হলে বিস্তারিত জানতে সাপোর্ট পেজে যোগাযোগ করুন।',
  },
  {
    icon: '↻',
    title: 'শর্তাবলীর পরিবর্তন',
    body: 'প্রোগ্রামের উন্নতির স্বার্থে Galiver যেকোনো সময় এই শর্তাবলী ও কমিশন হার পরিবর্তন করতে পারে। উল্লেখযোগ্য পরিবর্তন হলে তা এই পেজে আপডেট করা হবে।',
  },
];

export default function Terms() {
  return <main className="terms-page shell">
    <style>{`.terms-page{max-width:900px;padding-bottom:120px}.terms-hero{text-align:center;margin:20px auto 26px}.terms-hero h1{margin:0;color:#17231d;font:700 30px Arial,sans-serif}.terms-hero h1 span{color:#e35d38}.terms-hero p{margin:10px auto 0;max-width:560px;color:#64716b;font:15px/1.6 Arial,sans-serif}.terms-list{display:grid;gap:14px}.terms-card{display:grid;grid-template-columns:44px 1fr;gap:14px;padding:20px;border:1px solid #dfe5dc;border-radius:10px;background:#fff;box-shadow:0 2px 8px rgba(21,28,39,.04)}.terms-icon{display:grid;place-items:center;width:44px;height:44px;border-radius:10px;background:#fdece7;color:#e35d38;font:700 19px Arial,sans-serif}.terms-card h2{margin:0 0 6px;color:#17231d;font:700 16px Arial,sans-serif}.terms-card p{margin:0;color:#526159;font:14px/1.7 Arial,sans-serif}.terms-updated{margin:22px 0 0;text-align:center;color:#94a09a;font:12px Arial,sans-serif}@media(max-width:600px){.terms-hero h1{font-size:25px}.terms-card{grid-template-columns:36px 1fr;padding:16px;gap:10px}.terms-icon{width:36px;height:36px;font-size:16px}}`}</style>
    <header className="terms-hero"><h1>নিয়ম ও <span>শর্তাবলী</span></h1><p>Galiver অ্যাফিলিয়েট প্রোগ্রামে অংশগ্রহণের আগে নিচের শর্তগুলো পড়ে নিন।</p></header>
    <section className="terms-list">
      {sections.map(section => <article className="terms-card" key={section.title}>
        <span className="terms-icon" aria-hidden="true">{section.icon}</span>
        <div><h2>{section.title}</h2><p>{section.body}</p></div>
      </article>)}
    </section>
    <p className="terms-updated">সর্বশেষ আপডেট: সেপ্টেম্বর ২০২৬</p>
  </main>;
}
