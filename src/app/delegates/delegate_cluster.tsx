// pages/delegates.js
import { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3-force';
import { DelegateContext } from "@/providers/stateProvider";
import { useContext } from "react";


const Delegates = () => {
  const fgRef = useRef();

  const dCon = useContext(DelegateContext);
    const data = {
        nodes: dCon.delegates
        .filter((d) => d.votingpower/d.maxvotingpower > 0.05)
        .filter((d) => d.name)
        .map((d) => {
            return {
                id: d.wallet,
                name: d.name,
                votingPower: d.votingpower / 100000,
                score: d.score,
            };
        }),
        links: []
    };

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge', d3.forceManyBody().strength(20));  // Set repulsion force
      fgRef.current.d3Force('center', d3.forceCenter());    // Centering force
      fgRef.current.d3Force('collide', d3.forceCollide().radius(node => Math.sqrt(node.votingPower) * 5)); // Add collision force with exact radius
    }
  }, []);

  const getColorForDistance = (id, distance) => {
    let ratio = dCon.delegates.filter(d => d.wallet === id)[0].score || 0;
    ratio = Math.max(-1, Math.min(1, ratio));
    const red = Math.floor(255 * -ratio);
    const green = Math.floor(255 * ratio);
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

