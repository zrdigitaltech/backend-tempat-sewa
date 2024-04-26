export default function Index() {
  return (
    <footer>
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Nama Pemilik Kontrakan
          <br />
          Didukung oleh{' '}
          <a href="https://zrdevelopers.github.io/" target="_blank" className="text-primary">
            ZRDevelopers
          </a>{' '}
        </p>
      </div>
    </footer>
  );
}
