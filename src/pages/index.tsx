import type { NextPage } from 'next';

const Home: NextPage = ({ episodes }: any) => {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(episodes)}</p>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60, // 1 hour
  };
}

export default Home;
