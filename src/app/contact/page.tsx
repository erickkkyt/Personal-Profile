export default function ContactPage() {
  return (
    <div className="container-custom max-w-3xl py-16 space-y-6">
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">联系与咨询</h1>
      <p className="text-gray-700 dark:text-gray-200 text-lg">留下你的邮箱或需求，我们会尽快回复。也可直接通过微信/邮箱联系。</p>
      <div className="space-y-4 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-gray-900/70 p-6 shadow-sm">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.18em] mb-1">Email</p>
          <p className="text-base text-gray-900 dark:text-white">kh844257437@gmail.com</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.18em] mb-1">WeChat</p>
          <p className="text-base text-gray-900 dark:text-white">15355407564</p>
        </div>
      </div>
    </div>
  );
}
