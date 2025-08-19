---
title: "RSoft | 光纤布拉格光栅（FBG）基础仿真流程"
description: "一些关于 RSoft的光纤布拉格光栅基础建模与仿真流程"
date: "2025-08-12"
category: "学习分享"
tags: ["RSoft", "FBG", "光纤布拉格光栅", "光学仿真"]
featured: false
---

import { Figure, FigureImage } from '@/components/Figure'


# 光纤布拉格光栅基础仿真流程

> 在课程设计过程中，由于要使用 RSoft 仿真软件来进行实验，然而实验指导手册可能由于较为远古且跟不上版本等原因，导致漏洞和细节较多，对仿真软件的学习造成了很大阻碍，因此，在大概摸索了一番后，根据自己的仿真流程撰写如下教程，可能还有些许漏洞，如发现 BUG 烦请告知我，谢谢！


## 1.1 全局设置

安装并打开 RSoft 仿真软件后，点击左上角 **File** 选项卡中的 **New…** 创建新项目，此时弹出 **Startup Windows** 进行全局设置（如图 1 所示）。根据需要，我们将 **Free Space Wavelength**，即自由空间波长设置为 1.502μm（RSoft 仿真软件中长度单位均默认为 μm），将 **Background Index**，即背景折射率设置为 1.45μm。默认纤芯直径 1μm，在 2 维下进行仿真。

<Figure postCaption="图 1 全局设置界面">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft1.png" alt="图 1 全局设置界面" />
</Figure>

## 1.2 创建全局变量

 
进入仿真界面后，首先点击左侧工具栏中**Edit Symbols** 设置全局变量（如图2所示），之后根据需要设置全局变量的名称和值，方便后续仿真进行修改。具体创建方法为：先点击**New Symbol** 创建新变量，输入名称和值后点击**Accept Symbol** 确定创建。下表为后续仿真加入的全局变量：

<Figure preCaption="表 1 全局变量设置">

| **变量名**    | **值** | **物理意义**    |
| ------------- | ------ | --------------- |
| Period        | 0.5    | 光栅的周期500nm |
| Lin           | 2      | 输入光纤的长度  |
| Lout          | Lin    | 输出光纤的长度  |
| M             | 40     | 周期数          |
| delta_grating | 0.05   | 折射率调制微扰  |

</Figure>



<Figure postCaption="图 2 Edit Symbols页面">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft2.png" alt="图 2 Edit Symbols页面" />
</Figure>

## 1.3 绘制波导

选择左侧工具栏**Segment (In Plane)**，左键依次点击两个位置作为波导起始点绘制一段波导（如图3所示）。

<Figure postCaption="图 3 Segment (In Plane)与绘制波导">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft3.png" alt="图 3 Segment (In Plane)与绘制波导" />
</Figure>

右键红色波导弹出**Properties for Segment** 对波导进行详细设置。

根据需求，我们需要一段输入光纤（如图4所示），一段栅区，一段输出光纤（如图5所示），因此绘制三段波导对其进行详细设置。

<Figure postCaption="图 4 输入光纤设置">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft4.png" alt="图 4 输入光纤设置" />
</Figure>

<Figure postCaption="图 5 输出光纤设置">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft5.png" alt="图 5 输出光纤设置" />
</Figure>

其中，栅区需要单独进行设置。首先点击上方**Edit/Tables/Edit User Tapers…** 打开用户自定义Taper窗口，将**Source Type** 选为*Grating*，将**Period** 填上已经设置好的全局变量*Period*，并将**Profile Type** 改为*Rectangular*，如果此处使用默认的*Sinusoidal* 将无法在后续看到栅区折射率分布图 。点击**OK** 保存*User Taper 1* 的设置。

现在再次打开栅区的**Properties for Segment** 页面，将**Ending Vertex** 中的**Index Difference** 改为*delta_grating*，**Z** 方向的**Offset** 改为*M\*Period*，然后将*Index Taper* 改成*User 1*，并检查**Tapers…**，之后点击**OK** 完成设置（如图6所示）。

如果修改后无法在屏幕中找到波导，可通过上方**View/Full** 将波导置满屏幕。其中为了便于区分，将栅区波导颜色设置为黄色，最终画面如图7所示。

<Figure postCaption="图 6 栅区设置">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft6.png" alt="图 6 栅区设置" />
</Figure>

<Figure postCaption="图 7 绘制波导图像">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft7.png" alt="图 7 绘制波导图像" />
</Figure>

## 1.4 观察栅区折射率分布

完成以上设置后，保存该文件，路径和文件名均为英文。之后点击左侧工具栏中的**Display Material Profile**，将**Grid Size** 中**Z** 的**Current Value** 设置为0.25，

**Domain Min** 和**Domain Max** 设置为-10和10，将下方的**Display Mode** 改为*Contour Map(XZ)* ，并更改输出名称，如图8所示。之后点击**OK** 输出折射率分布图像，如图9所示。

<Figure postCaption="图 8 Display Material Profile页面">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft8.png" alt="图 8 Display Material Profile页面" />
</Figure>

<Figure postCaption="图 9 折射率分布图">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft9.png" alt="图 9 折射率分布图" />
</Figure>

## 1.5 定义Pathway和Monitor

首先点击左侧工具栏上的**Perform Simulation**，进入**Advanced…**，将其中的**Bidirectional Calculation** 勾选上，点击**OK** 保存（如图10所示） 。

<Figure postCaption="图 10 Bidirectional Calculation选项设置">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft10.png" alt="图 10 Bidirectional Calculation选项设置" />
</Figure>

然后点击左侧工具栏上的**Edit Pathways**，在出现的对话窗口上点击**New** 按钮，依次点击三段波导变绿设置为Pathway（如图11所示）。

<Figure postCaption="图 11 设置波导为Pathway">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft11.png" alt="图 11 设置波导为Pathway" />
</Figure>

然后点击左侧**Monitors…**，再点击两次**New** 生成两个**Monitor**，第二个**Monitor** 更改**Component** 为*Major-Backward*，点击OK退出保存设置（如图12所示）。

<Figure postCaption="图 12 Monitor设置">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft12-1.png" alt="图 12 Monitor设置 1" />
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft12-2.png" alt="图 12 Monitor设置 2" className="mt-2" />
</Figure>

## 1.6 基础仿真

点击左侧工具栏的**Perform Simulation**，再点击**Advanced…**，在其中的**Opts…**

选项中更改**Tolerance** 中数值为5e-05，点击OK保存（如图13所示）。

<Figure postCaption="图 13 Perform Simulation设置">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft13.png" alt="图 13 Perform Simulation设置" />
</Figure>

然后在**Output…** 中修改**Composite** **Slice Format** 为*None* ，更改输出名称后点击**OK** 进行仿真。

仿真结果如图14所示，蓝色曲线为正向传输的纤芯模的能量变化、绿色为反向传输的纤芯模的能量变化，在选定的工作波长处（1502nm），正向传输的光能量 降低了92%左右，同时反向传输光的能量也增加了92%左右。

<Figure postCaption="图 14 仿真正反传输能量变化">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft14.png" alt="图 14 仿真正反传输能量变化" />
</Figure>

## 1.7 获得光栅透射谱

点击左侧工具栏上的**Perform Parameter Scan**，添加对波长的扫描，从1.3-1.7μm，**Steps** 设置为81，点击**OK** 进行仿真（如图15所示）。

<Figure postCaption="图 15 Perform Parameter Scan设置">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft15.png" alt="图 15 Perform Parameter Scan设置" />
</Figure>

等待一段时间后，在弹出的界面中点击**Open results in DataBROWSER** ，即可查看仿真结果，如图16和图17所示。

<Figure postCaption="图 16 打开结果界面">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft16.png" alt="图 16 打开结果界面" />
</Figure>

<Figure postCaption="图 17 仿真结果-透射谱">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft17.png" alt="图 17 仿真结果-透射谱" />
</Figure>

## 1.8 通过GratingMOD获得反射功率谱

在左上角将**BeamPROP** 改为**GratingMOD**，点击左侧工具栏**Perform Simulation**，将**Wavelength Range** 改为1.3，1.7，选择**SPECTRAL CHARACTERISTICS** 勾选需要的具体数据，然后对输出文件命名后，点击OK进行仿真（如图18所示）。

<Figure postCaption="图 18 GratingMOD设置">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft18-1.png" alt="图 18 GratingMOD设置 1" />
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft18-2.png" alt="图 18 GratingMOD设置 2" className="mt-2" />
</Figure>

仿真结果如图19所示，其中**Peak：0.911106@1.50515** 代表在波长 **1.50515 μm** 处达到最大相对功率 **0.911106**（接近全反射）；**FWHM：0.062771** 代表半高全宽为**0.0627717 μm**。

<Figure postCaption="图 19 GratingMOD仿真结果（对照组）">
  <FigureImage src="https://raw.githubusercontent.com/YuYigy/my-blog-images/main/img/RSoft19.png" alt="图 19 GratingMOD仿真结果（对照组）" />
</Figure>

