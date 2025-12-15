export default function FAQPage() {
  const faqs = [
    { q: '课程价格与更新节奏？', a: '699/年，持续更新，新增章节与模板会同步上线课程。' },
    { q: '模板是否包含在课程内？', a: '是的，课程内包含全部模板；模板单买 299/次适合已有基础或仅需素材的用户。' },
    { q: '是否支持试听或退款？', a: '可提供试听/试看章节，具体退款与保障政策可在购买前咨询。' },
    { q: '适合什么人群？', a: '运营/市场/内容团队、独立开发者/创作者，以及希望用 n8n + AI 自动化工作流的团队。' },
  ];

  return (
    <div className="container-custom max-w-4xl py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">FAQ</p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">常见问题</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200">购买前的主要疑问与保障政策，更多问题可在联系页咨询。</p>
      </header>

      <div className="space-y-4">
        {faqs.map((item) => (
          <div key={item.q} className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-gray-900/70 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
