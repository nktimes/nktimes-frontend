export default function Home() {
  return <div />;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/article/hello',
      permanent: false,
    }
  }
}
