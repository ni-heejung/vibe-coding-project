import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'

const Footer = async () => {
  const t = await getTranslations('Footer')

  return (
    <footer>
      <div className="container">
        <Link href="/" className="logo-font">
          conduit
        </Link>
        <span className="attribution">
          {t('about')}
          <a href="https://thinkster.io">Thinkster</a>.{t('licence')}
        </span>
      </div>
    </footer>
  )
}
export default Footer
