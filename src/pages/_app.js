import '@/styles/globals.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Google Analytics
export function reportWebVitals({ id, name, label, value }) {
  window.gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  useEffect(() => {
    // Google Analytics 初始化
    const script1 = document.createElement('script')
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-9TQ3NWGFC9'
    script1.async = true
    document.head.appendChild(script1)
    
    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-9TQ3NWGFC9', {
        page_path: window.location.pathname,
      });
    `
    document.head.appendChild(script2)
    
    // 页面路由变化时发送 pageview
    const handleRouteChange = (url) => {
      window.gtag('config', 'G-9TQ3NWGFC9', {
        page_path: url,
      })
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  
  return <Component {...pageProps} />
}

export default MyApp 