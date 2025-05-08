export default function Index() {
  return (
    <div
      id="loader"
      style={{
        width: '100vw',
        height: '40vh',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <img
        src="/assets/images/loader.gif"
        alt="Loading..."
        style={{
          width: '40px',
          height: '40px'
        }}
      />
      <h4>Sedang memuat, harap tunggu...</h4>
    </div>
  );
}
