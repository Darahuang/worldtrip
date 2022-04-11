export default function goTop() {
  if (window.pageYOffset > 100) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
