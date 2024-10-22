'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from '../../styles/FlockingSimulation.module.css';

const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => <p>Loading simulation...</p>
});

const FlockingSimulation = () => {
  const [boids, setBoids] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [settings, setSettings] = useState({
    numBoids: 100,
    radius: 100,
    velocity: 100,
    cohesion: 1,
    separation: 1,
    alignment: 1
  });

  const w = 800;
  const h = 800;

  useEffect(() => {
    setIsMounted(true);
    initializeBoids();
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        updateBoids();
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, settings]);

  const initializeBoids = () => {
    const newBoids = Array.from({ length: settings.numBoids }, () => ({
      x: w * (Math.round(Math.random()) * 2 - 1) * Math.random(),
      y: h * (Math.round(Math.random()) * 2 - 1) * Math.random(),
      vx: (Math.random() - 0.5) * settings.velocity / 50,
      vy: (Math.random() - 0.5) * settings.velocity / 50
    }));
    setBoids(newBoids);
  };

  const updateBoids = () => {
    setBoids(prevBoids => {
      return prevBoids.map(boid => {
        const neighbors = getNeighbors(boid, prevBoids);
        const { vx, vy } = calculateNewVelocity(boid, neighbors);
        
        let newX = boid.x + vx;
        let newY = boid.y + vy;
        
        return wrapCoordinates(newX, newY, vx, vy);
      });
    });
  };

  const getNeighbors = (boid, allBoids) => {
    return allBoids.filter(other => 
      boid !== other && 
      Math.sqrt(Math.pow(boid.x - other.x, 2) + Math.pow(boid.y - other.y, 2)) < settings.radius
    );
  };

  const calculateNewVelocity = (boid, neighbors) => {
    if (neighbors.length === 0) {
      return { vx: boid.vx, vy: boid.vy };
    }

    const { cx, cy } = cohesion(boid, neighbors);
    const { sx, sy } = separation(boid, neighbors);
    const { ax, ay } = alignment(neighbors);

    let vx = boid.vx + 
             settings.cohesion * cx + 
             settings.separation * sx + 
             settings.alignment * ax;
    let vy = boid.vy + 
             settings.cohesion * cy + 
             settings.separation * sy + 
             settings.alignment * ay;

    const speed = Math.sqrt(vx * vx + vy * vy);
    if (speed > 0) {
      vx = (vx / speed) * settings.velocity / 50;
      vy = (vy / speed) * settings.velocity / 50;
    }

    return { vx, vy };
  };

  const cohesion = (boid, neighbors) => {
    const center = neighbors.reduce((acc, cur) => ({ x: acc.x + cur.x, y: acc.y + cur.y }), { x: 0, y: 0 });
    center.x /= neighbors.length;
    center.y /= neighbors.length;
    return {
      cx: (center.x - boid.x) / 100,
      cy: (center.y - boid.y) / 100
    };
  };

  const separation = (boid, neighbors) => {
    return neighbors.reduce((acc, cur) => {
      const d = Math.sqrt(Math.pow(boid.x - cur.x, 2) + Math.pow(boid.y - cur.y, 2));
      return {
        sx: acc.sx + (boid.x - cur.x) / (d * d),
        sy: acc.sy + (boid.y - cur.y) / (d * d)
      };
    }, { sx: 0, sy: 0 });
  };

  const alignment = (neighbors) => {
    const avgVelocity = neighbors.reduce((acc, cur) => ({ vx: acc.vx + cur.vx, vy: acc.vy + cur.vy }), { vx: 0, vy: 0 });
    avgVelocity.vx /= neighbors.length;
    avgVelocity.vy /= neighbors.length;
    return {
      ax: avgVelocity.vx / 8,
      ay: avgVelocity.vy / 8
    };
  };

  const wrapCoordinates = (x, y, vx, vy) => ({
    x: x > w ? x - 2 * w : x < -w ? x + 2 * w : x,
    y: y > h ? y - 2 * h : y < -h ? y + 2 * h : y,
    vx, vy
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: Number(value) };
      
      if (setting === 'numBoids') {
        const diff = value - prev.numBoids;
        if (diff > 0) {
          setBoids(prevBoids => [
            ...prevBoids,
            ...Array.from({ length: diff }, () => ({
              x: w * (Math.round(Math.random()) * 2 - 1) * Math.random(),
              y: h * (Math.round(Math.random()) * 2 - 1) * Math.random(),
              vx: (Math.random() - 0.5) * newSettings.velocity / 50,
              vy: (Math.random() - 0.5) * newSettings.velocity / 50
            }))
          ]);
        } else if (diff < 0) {
          setBoids(prevBoids => prevBoids.slice(0, value));
        }
      }
      
      return newSettings;
    });
  };

  const toggleSimulation = () => {
    setIsRunning(prev => !prev);
  };

  const restartSimulation = () => {
    initializeBoids();
    setIsRunning(true);
  };

  const getPlotData = useCallback(() => [{
    x: boids.map(b => b.x),
    y: boids.map(b => b.y),
    mode: 'markers',
    type: 'scatter',
    marker: { color: 'blue', size: 5 }
  }], [boids]);

  const getPlotLayout = useCallback(() => ({
    autosize: true,
    xaxis: { range: [-w, w], showgrid: false, zeroline: false, showline: false, ticks: '', showticklabels: false },
    yaxis: { range: [-h, h], showgrid: false, zeroline: false, showline: false, ticks: '', showticklabels: false },
    margin: { l: 0, r: 0, b: 0, t: 0, pad: 4 },
    plot_bgcolor: '#E6E6FA',
    hovermode: false
  }), [w, h]);

  const tooltips = {
    numBoids: "Number of boids in the simulation",
    radius: "Radius within which boids interact with each other",
    velocity: "Speed at which boids move",
    cohesion: "Tendency of boids to move towards the center of mass of nearby boids",
    separation: "Tendency of boids to avoid crowding nearby boids",
    alignment: "Tendency of boids to align with the average heading of nearby boids"
  };

  return (
    <div className={styles.flockingSimulation}>
      <div className={styles.simulationContainer}>
        <div className={styles.controlsContainer}>
          <div className={styles.controls}>
            <button 
              className={styles.button} 
              onClick={toggleSimulation}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button 
              className={styles.button} 
              onClick={restartSimulation}
            >
              Restart
            </button>
          </div>
          <div className={styles.options}>
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className={styles.settingContainer}>
                <label className={styles.settingLabel}>
                  {key}: {value}
                  <span className={styles.tooltip}>{tooltips[key]}</span>
                </label>
                <input
                  type="range"
                  min={key === 'numBoids' ? 10 : 0}
                  max={key === 'numBoids' ? 2000 : key === 'radius' ? 1280 : key === 'velocity' ? 1000 : 2}
                  step={key === 'numBoids' || key === 'radius' || key === 'velocity' ? 10 : 0.1}
                  value={value}
                  onChange={(e) => handleSettingChange(key, e.target.value)}
                  className={styles.slider}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.plotContainer}>
          {isMounted && (
            <Plot
              data={getPlotData()}
              layout={getPlotLayout()}
              config={{ displayModeBar: false, responsive: true }}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlockingSimulation;