export const useTheme = () => {
  const isDark = useState('isDark', () => false)

  const applyClass = (val: boolean) => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', val)
    }
  }

  const toggle = () => {
    isDark.value = !isDark.value
    applyClass(isDark.value)
  }

  return { isDark, toggle, applyClass }
}
