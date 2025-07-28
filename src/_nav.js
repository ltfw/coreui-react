// _nav.js
import { cilApplications, cilChart, cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem } from '@coreui/react'
import { useAuth } from './contexts/AuthContext'

const mode = import.meta.env.VITE_APP_MODE || 'production'

const useNav = () => {
  const { user } = useAuth()
  console.log('useNav user:', user);

  const role = user?.UserRoleCode || 'GUEST'

  const menuConfig = [
    {
      component: CNavGroup,
      name: 'Customer',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      roles: ['ADM', 'FAS', 'APJA-TGR',
        'APJA-SMG',
        'APJA-HO',
        'APJF',
        'APJF-TGR',
        'APJF-SMG',
        'SPV',
        'SPV_JATIM001','DRO'],
      items: [
        {
          component: CNavItem,
          name: 'Data Customer',
          to: '/customer/customers',
        },
        ...(mode !== 'production'
          ? [
            {
              component: CNavItem,
              name: 'Rekualifikasi Customer',
              to: '/customer/requalify',
            },
          ]
          : []),
      ],
    },
    {
      component: CNavGroup,
      name: 'Tools',
      icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
      roles: ['ADM', 'FAS','DRO'],
      items: [
        {
          component: CNavItem,
          name: 'Import Faktur Pajak',
          to: '/tools/importpajak',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Daftar Laporan',
      icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
      roles: ['ADM', 'MKT-SANI (JABAR)', 'MKT-SANI (JATIM)', 'MKT-SANI (JATENG)', 'FAS','DRO'],
      items: [
        {
          component: CNavItem,
          name: 'Penjualan',
          to: '/report/sales',
        },
        {
          component: CNavItem,
          name: 'Stock Per Batch',
          to: '/report/stock',
        },
        ...(mode !== 'production'
          ? []
          : []),
      ],
    },
  ]

  const _nav = menuConfig.filter((section) => section.roles.includes(role))

  return _nav
}

export default useNav
