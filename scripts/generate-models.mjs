import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import * as THREE from "three";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

class NodeFileReader {
  result = null;
  onloadend = null;
  onerror = null;

  readAsArrayBuffer(blob) {
    blob
      .arrayBuffer()
      .then((buffer) => {
        this.result = buffer;
        this.onloadend?.();
      })
      .catch((error) => this.onerror?.(error));
  }

  readAsDataURL(blob) {
    blob
      .arrayBuffer()
      .then((buffer) => {
        this.result = `data:${blob.type};base64,${Buffer.from(buffer).toString("base64")}`;
        this.onloadend?.();
      })
      .catch((error) => this.onerror?.(error));
  }
}

globalThis.FileReader = NodeFileReader;

const gold = new THREE.MeshStandardMaterial({
  name: "Oro cálido",
  color: 0xd7a844,
  metalness: 0.96,
  roughness: 0.16,
});
const silver = new THREE.MeshStandardMaterial({
  name: "Metal plateado",
  color: 0xe7e9e9,
  metalness: 0.98,
  roughness: 0.12,
});
const diamond = new THREE.MeshPhysicalMaterial({
  name: "Cristal claro",
  color: 0xffffff,
  metalness: 0,
  roughness: 0.02,
  transmission: 0.72,
  thickness: 0.45,
  ior: 2.2,
  transparent: true,
  opacity: 0.88,
});
const sapphire = new THREE.MeshPhysicalMaterial({
  name: "Piedra azul",
  color: 0x163e78,
  metalness: 0,
  roughness: 0.05,
  transmission: 0.18,
  thickness: 0.65,
  ior: 1.85,
});
const palePink = new THREE.MeshPhysicalMaterial({
  name: "Piedra rosa pálido",
  color: 0xed9fc3,
  metalness: 0,
  roughness: 0.05,
  transmission: 0.4,
  thickness: 0.5,
});
const rose = new THREE.MeshPhysicalMaterial({
  name: "Piedra rosa intenso",
  color: 0xb50e63,
  metalness: 0,
  roughness: 0.06,
  transmission: 0.18,
  thickness: 0.55,
});
const lilac = new THREE.MeshPhysicalMaterial({
  name: "Piedra lila",
  color: 0xb392d7,
  metalness: 0,
  roughness: 0.06,
  transmission: 0.35,
  thickness: 0.5,
});

function mesh(geometry, material, position = [0, 0, 0], scale = [1, 1, 1]) {
  const item = new THREE.Mesh(geometry, material);
  item.position.set(...position);
  item.scale.set(...scale);
  item.castShadow = true;
  item.receiveShadow = true;
  return item;
}

function addBand(group, material, radius = 1.35, tube = 0.14) {
  group.add(mesh(new THREE.TorusGeometry(radius, tube, 24, 112), material));
}

function addProng(group, x, y, z, material, radius = 0.075) {
  group.add(mesh(new THREE.SphereGeometry(radius, 16, 12), material, [x, y, z]));
}

function addDiamond(group, position, size = 0.2) {
  group.add(
    mesh(
      new THREE.OctahedronGeometry(size, 2),
      diamond,
      position,
      [1, 1, 0.58],
    ),
  );
}

function tube(points, radius, material) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  return mesh(new THREE.TubeGeometry(curve, 36, radius, 10, false), material);
}

function blueSapphireRing() {
  const group = new THREE.Group();
  group.name = "Anillo Zafiro Azul — reconstrucción visual";
  addBand(group, gold, 1.42, 0.15);

  const centerY = 1.46;
  group.add(
    mesh(
      new THREE.OctahedronGeometry(0.68, 3),
      sapphire,
      [0, centerY, 0.16],
      [0.78, 1, 0.58],
    ),
  );
  [-0.77, -0.55, 0.55, 0.77].forEach((x, index) =>
    addDiamond(group, [x, centerY + (index % 2 ? -0.19 : 0.17), 0.1], 0.2),
  );
  addDiamond(group, [-0.82, centerY - 0.25, 0.08], 0.18);
  addDiamond(group, [0.82, centerY - 0.25, 0.08], 0.18);

  [
    [-0.43, centerY + 0.55],
    [0.43, centerY + 0.55],
    [-0.43, centerY - 0.55],
    [0.43, centerY - 0.55],
  ].forEach(([x, y]) => addProng(group, x, y, 0.2, gold, 0.09));
  return group;
}

function pinkStonesRing() {
  const group = new THREE.Group();
  group.name = "Anillo Piedras Rosas — reconstrucción visual";
  addBand(group, gold, 1.36, 0.13);

  const stones = [
    [-0.82, palePink, [1.3, 0.95, 0.62]],
    [-0.42, rose, [1, 1, 0.62]],
    [0, lilac, [1.45, 0.9, 0.62]],
    [0.42, rose, [1, 1, 0.62]],
    [0.82, lilac, [1.25, 0.95, 0.62]],
  ];
  stones.forEach(([x, material, scale]) => {
    group.add(
      mesh(
        new THREE.OctahedronGeometry(0.25, 2),
        material,
        [x, 1.37 + (Math.abs(x) * -0.05), 0.13],
        scale,
      ),
    );
    addProng(group, x - 0.14, 1.53, 0.15, gold, 0.055);
    addProng(group, x + 0.14, 1.53, 0.15, gold, 0.055);
  });
  return group;
}

function solitaireRing() {
  const group = new THREE.Group();
  group.name = "Anillo Solitario — reconstrucción visual";
  addBand(group, silver, 1.43, 0.16);
  group.add(
    mesh(new THREE.OctahedronGeometry(0.48, 3), diamond, [0, 1.56, 0.15], [1, 1, 0.72]),
  );
  [
    [-0.32, 1.73],
    [0.32, 1.73],
    [-0.31, 1.38],
    [0.31, 1.38],
  ].forEach(([x, y]) => addProng(group, x, y, 0.18, silver, 0.075));
  return group;
}

function beetlePendant() {
  const group = new THREE.Group();
  group.name = "Dije Escarabajo — reconstrucción visual";

  group.add(mesh(new THREE.SphereGeometry(0.7, 48, 32), silver, [0, -0.15, 0], [0.82, 1.18, 0.38]));
  group.add(mesh(new THREE.SphereGeometry(0.42, 40, 28), silver, [0, 0.72, 0.02], [1, 0.72, 0.58]));
  group.add(mesh(new THREE.TorusGeometry(0.28, 0.09, 20, 64), silver, [0, 1.55, 0]));
  group.add(mesh(new THREE.BoxGeometry(0.42, 0.45, 0.2), silver, [0, 1.35, 0], [1.15, 1, 0.75]));

  group.add(mesh(new THREE.SphereGeometry(0.15, 24, 18), sapphire, [-0.22, 0.84, 0.26], [1, 1, 0.55]));
  group.add(mesh(new THREE.SphereGeometry(0.15, 24, 18), sapphire, [0.22, 0.84, 0.26], [1, 1, 0.55]));
  group.add(mesh(new THREE.BoxGeometry(0.055, 1.55, 0.08), silver, [0, -0.22, 0.31], [1, 1, 0.75]));

  const legs = [
    [[-0.42, 0.45, 0], [-0.76, 0.68, 0], [-0.84, 0.96, 0]],
    [[0.42, 0.45, 0], [0.76, 0.68, 0], [0.84, 0.96, 0]],
    [[-0.51, 0.04, 0], [-0.92, 0.12, 0], [-1.02, 0.42, 0]],
    [[0.51, 0.04, 0], [0.92, 0.12, 0], [1.02, 0.42, 0]],
    [[-0.48, -0.46, 0], [-0.83, -0.64, 0], [-0.91, -0.92, 0]],
    [[0.48, -0.46, 0], [0.83, -0.64, 0], [0.91, -0.92, 0]],
  ];
  legs.forEach((points) => group.add(tube(points, 0.055, silver)));
  return group;
}

async function exportGlb(group, output) {
  group.rotation.x = -0.08;
  group.traverse((child) => {
    if (child.isMesh) child.geometry.computeVertexNormals();
  });

  const exporter = new GLTFExporter();
  const result = await new Promise((resolveExport, rejectExport) => {
    exporter.parse(group, resolveExport, rejectExport, {
      binary: true,
      onlyVisible: true,
      trs: false,
    });
  });
  const path = resolve(output);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, Buffer.from(result));
  console.log(`Wrote ${path}`);
}

await exportGlb(blueSapphireRing(), "public/products/anillo-zafiro-azul/model.glb");
await exportGlb(beetlePendant(), "public/products/dije-escarabajo/model.glb");
await exportGlb(pinkStonesRing(), "public/products/anillo-piedras-rosas/model.glb");
await exportGlb(solitaireRing(), "public/products/anillo-solitario/model.glb");
