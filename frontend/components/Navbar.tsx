import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiSun, FiMoon } from 'react-icons/fi';

interface DarkModeProps {
  mounted: any,
  setMounted: any,
  theme: any,
  setTheme: any,
  resolvedTheme: any
}

const Navbar = (darkModeProps: DarkModeProps) => {
  const router = useRouter();
  return (
    <div className="nav">
      <Link href='/members'>
        <div className={router.pathname == "/members" ? "members button active" : "members button"}>Members</div>
      </Link>
      <SunMoon {...darkModeProps} />
    </div>
  )
}

export default Navbar

const SunMoon = ({ mounted, setMounted, theme, setTheme, resolvedTheme }: DarkModeProps) => {
  return (
    <div className='button' onClick={() => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
      setMounted(theme === 'dark' ? false : true)
    }}>
      <div>{(mounted && (theme === 'dark')) ? <FiSun color={'#ffc107'} /> : <FiMoon />}</div>
    </div>
  );
};