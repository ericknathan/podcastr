import type { NextPage, GetStaticProps } from 'next';
import { api } from '../services/api';

type Episode = {
  id: string;
  title: string;
  members: string;
};

interface HomeProps {
  episodes: Episode[];
}

const Home: NextPage<HomeProps> = ({ episodes }: HomeProps) => {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(episodes)}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });
  const data = await response.data();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60, // 1 hour
  };
};

export default Home;
