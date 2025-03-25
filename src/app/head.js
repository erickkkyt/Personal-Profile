export default function Head() {
  return (
    <>
      <title>个人专业主页</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="我的个人专业主页，展示我的技能、项目和博客" />
      <link rel="icon" href="/favicon.ico" />
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XSV0VDCENG"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XSV0VDCENG');
          `,
        }}
      />
    </>
  );
} 