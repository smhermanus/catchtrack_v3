'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <div
      className={classnames(horizontalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span className='text-textSecondary'>{`© ${new Date().getFullYear()}, Made with `}</span>
        <span>{`❤️`}</span>
        <span className='text-textSecondary'>{` by `}</span>
        <Link href='https://assetflow.co.za/' target='_blank' className='text-primary uppercase'>
          Assetflow
        </Link>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <Link href='https://assetflow.co.za/licenses/standard' target='_blank' className='text-primary'>
            License
          </Link>
          <Link href='https://assetflow.co.za/user/assetflow/portfolio' target='_blank' className='text-primary'>
            More Themes
          </Link>
          <Link
            href='https://demos.assetflow.co.za/materialize-nextjs-admin-template/documentation'
            target='_blank'
            className='text-primary'
          >
            Documentation
          </Link>
          <Link href='https://assetflow.ticksy.com' target='_blank' className='text-primary'>
            Support
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterContent
