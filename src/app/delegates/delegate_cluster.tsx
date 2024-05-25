// pages/delegates.js
import { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3-force';

const Delegates = () => {
  const fgRef = useRef();

  const data = {
    nodes: [
      { id: 'delegate1', name: 'Delegate 1', votingPower: 10 },
      { id: 'delegate2', name: 'Delegate 2', votingPower: 20 },
      { id: 'delegate3', name: 'Delegate 3', votingPower: 300 },
      { id: 'delegate4', name: 'Delegate 4', votingPower: 40 },
      { id: 'delegate5', name: 'Delegate 5', votingPower: 50 },
      { id: 'delegate6', name: 'Delegate 6', votingPower: 10 },
      { id: 'delegate7', name: 'Delegate 7', votingPower: 20 },
      { id: 'delegate8', name: 'Delegate 8', votingPower: 300 },
      { id: 'delegate9', name: 'Delegate 9', votingPower: 40 },
      { id: 'delegate10', name: 'Delegate 10', votingPower: 50 },
      { id: 'delegate11', name: 'Delegate 11', votingPower: 100 },
      { id: 'delegate12', name: 'Delegate 12', votingPower: 20 },
      { id: 'delegate13', name: 'Delegate 13', votingPower: 30 },
      { id: 'delegate14', name: 'Delegate 14', votingPower: 400 },
      { id: 'delegate15', name: 'Delegate 15', votingPower: 50 },
      { id: 'delegate16', name: 'Delegate 16', votingPower: 10 },
      { id: 'delegate17', name: 'Delegate 17', votingPower: 200 },
      { id: 'delegate18', name: 'Delegate 18', votingPower: 30 },
      { id: 'delegate19', name: 'Delegate 19', votingPower: 40 },
      { id: 'delegate20', name: 'Delegate 20', votingPower: 500 },
      { id: 'delegate21', name: 'Delegate 21', votingPower: 10 },
      { id: 'delegate22', name: 'Delegate 22', votingPower: 20 },
      { id: 'delegate23', name: 'Delegate 23', votingPower: 300 },
      { id: 'delegate24', name: 'Delegate 24', votingPower: 40 },
      { id: 'delegate25', name: 'Delegate 25', votingPower: 50 },
      // Add more delegates here
    ],
    links: []
  };

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge', d3.forceManyBody().strength(20));  // Set repulsion force
      fgRef.current.d3Force('center', d3.forceCenter());    // Centering force
      fgRef.current.d3Force('collide', d3.forceCollide().radius(node => Math.sqrt(node.votingPower) * 5)); // Add collision force with exact radius
    }
  }, []);

  const maxDistance = {}
  const getColorForDistance = (id, distance) => {
    if (!maxDistance[id]) {
        maxDistance[id] = Math.max(distance, 10);
    } else {
        maxDistance[id] = Math.max(maxDistance[id], distance);
    }
    let maxDistanceLocal = maxDistance[id];
    const ratio = Math.max(0, (Math.abs(distance) / maxDistanceLocal));
    const red = Math.floor(255 * ratio);
    const green = Math.floor(255 * (1 - ratio));
    return `rgb(${red},${green},0)`;
  };

  const getIntersectionPoint = (referenceNode, node, radius) => {
    const dx = node.x - referenceNode.x;
    const dy = node.y - referenceNode.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return { x: referenceNode.x, y: referenceNode.y }; // Avoid division by zero
    const ratio = radius / distance;
    return {
      x: referenceNode.x + dx * ratio,
      y: referenceNode.y + dy * ratio
    };
  };

  const drawNodeWithGradient = (node, ctx, globalScale, referenceNode) => {
    const label = node.name;
    const fontSize = 12 / globalScale;
    const radius = Math.sqrt(node.votingPower) * 5;

    if (!isFinite(node.x) || !isFinite(node.y) || !isFinite(radius)) {
      console.error("Invalid values for node position or radius", { node, radius });
      return;
    }

    const dx = node.x - referenceNode.x;
    const dy = node.y - referenceNode.y;
    const distanceFromReference = Math.sqrt(dx * dx + dy * dy);

    const color = getColorForDistance(referenceNode.id, distanceFromReference);

    const intersectionPoint = getIntersectionPoint(referenceNode, node, Math.sqrt(referenceNode.votingPower) * 5);

    if (!isFinite(intersectionPoint.x) || !isFinite(intersectionPoint.y)) {
      console.error("Invalid intersection point", { intersectionPoint });
      return;
    }

    const gradient = ctx.createRadialGradient(intersectionPoint.x, intersectionPoint.y, 0, node.x, node.y, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.stroke();

    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(label, node.x, node.y);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const referenceNode = data.nodes.reduce((maxNode, currentNode) => {
            return currentNode.votingPower > maxNode.votingPower ? currentNode : maxNode;
          }, data.nodes[0]);

          const maxDistance = Math.max(...data.nodes.map(n => Math.sqrt((n.x - referenceNode.x) ** 2 + (n.y - referenceNode.y) ** 2)));
          data.nodes.forEach(referenceNode => {
            drawNodeWithGradient(node, ctx, globalScale, referenceNode);
          });
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          const radius = Math.sqrt(node.votingPower) * 5;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        onNodeClick={(node) => alert(`Clicked on ${node.name}`)}
      />
    </div>
  );
};

export default Delegates;

