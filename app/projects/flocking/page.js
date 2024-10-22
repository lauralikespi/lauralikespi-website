import dynamic from 'next/dynamic';

const FlockingSimulation = dynamic(() => import('./FlockingSimulation'), {
  ssr: false,
  loading: () => <p>Loading simulation...</p>
});

export default function FlockingPage() {
  return (
    <div className="flocking-page">
      <br/>
      <h1>Flocking Simulation</h1>
      <br/>
      <FlockingSimulation />
    </div>
  );
}