

<template>

<div id="info">
			<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a>
			<a href="https://pointclouds.org/documentation/tutorials/pcd_file_format.html" target="_blank" rel="noopener">PCD File format</a>
		</div>

		<!-- Import maps polyfill -->
		<!-- Remove this when import maps will be widely supported -->
	
        


</template>
<script>
import * as PCL from 'pcl.js';


let cloud;
let cloudFiltered;
let viewer;

main();
async function main() {
  await PCL.init({
    url: 'https://cdn.jsdelivr.net/npm/pcl.js/dist/pcl-core.wasm',
  });
  // 获取 PCD 文件
  const data = await fetch('https://cdn.jsdelivr.net/gh/luoxuhai/pcl.js@master/data/rops_tutorial/points.pcd').then(res => res.arrayBuffer());
  // PCL.savePCDFile("cloud.pcd",data);
  const dataCloud = await fetch("Users/chengli9464/study/pointCloud-Vue/src/data/800kV泰州换流站-Cut_Data_Part_42_save - Cloud.pcd").then(res => res.arrayBuffer());
  // 加载PCD文件数据，返回点云对象
  const cloud = PCL.loadPCDData(data, PCL.PointXYZRGB);
  console.log(cloud);
  const start = Date.now();
  const sor = new PCL.StatisticalOutlierRemoval();
  sor.setInputCloud(cloud);
  sor.setMeanK(40);
  sor.setStddevMulThresh(1.0);
  cloudFiltered = sor.filter();
}

function showPointCloud() {
  viewer = new PointCloudViewer(
    document.getElementById("canvas"),
    window.innerWidth,
    window.innerHeight
  );

  viewer.addPointCloud(cloud);
  viewer.setPointCloudProperties();
  viewer.setAxesHelper({ visible: true, size: 1 });
  viewer.setCameraParameters({ position: { x: 0, y: 0, z: 1.5 } });
  window.addEventListener("resize", () => {
    viewer.setSize(window.innerWidth, window.innerHeight);
  });
  document.getElementById("progress").style.display = "none";
  document.getElementById("container").style.display = "block";
  showPointCloud();
  bindEvent();
}

function bindEvent() {
  const radioOriginal = document.getElementById("original");
  const radioFiltered = document.getElementById("filtered");

  [radioOriginal, radioFiltered].forEach((el) => {
    el.addEventListener("change", (e) => {
      const mode = e.target.id;
      switch (mode) {
        case "original":
          viewer.addPointCloud(cloud);
          viewer.setPointCloudProperties({ color: "#F00" });
          break;
        case "filtered":
          viewer.addPointCloud(cloudFiltered);
          viewer.setPointCloudProperties({ color: "#0F0" });
          break;
      }
    });
  });
}


</script>

<style scoped>
 body {
        margin: 0;
        padding: 0;
      }

      .info {
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
      }

      label {
        cursor: pointer;
      }
</style>
